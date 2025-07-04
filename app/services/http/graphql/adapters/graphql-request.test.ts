import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GraphQLRequestAdapter } from './graphql-request'

vi.mock('graphql-request', () => {
  return {
    GraphQLClient: vi.fn(),
  }
})

vi.mock('../../core/core.utils', () => {
  return {
    createHeaders: vi.fn((headers) => {
      return {
        'Content-Type': 'application/json',
        ...headers,
      }
    }),
    createTimeoutSignal: vi.fn((timeout?: number) => {
      if (timeout) {
        const controller = new AbortController()
        setTimeout(() => {
          return controller.abort()
        }, timeout)
        return controller.signal
      }
      return undefined
    }),
  }
})

import { GraphQLClient } from 'graphql-request'

import { createHeaders, createTimeoutSignal } from '../../core/core.utils'

const mockGraphQLClient = vi.mocked(GraphQLClient)
const mockCreateHeaders = vi.mocked(createHeaders)
const mockCreateTimeoutSignal = vi.mocked(createTimeoutSignal)

describe('GraphQLRequestAdapter', () => {
  let adapter: GraphQLRequestAdapter
  let mockClientInstance: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockClientInstance = {
      request: vi.fn(),
    }
    mockGraphQLClient.mockImplementation(() => {
      return mockClientInstance as typeof mockClientInstance & GraphQLClient
    })
    mockCreateHeaders.mockReturnValue({ 'Content-Type': 'application/json' })
    adapter = new GraphQLRequestAdapter()
  })

  describe('constructor', () => {
    it('should create adapter with correct name', () => {
      expect(adapter.name).toBe('graphql-request')
    })
  })

  describe('request method', () => {
    it('should make request without optional parameters', async () => {
      const mockResponse = { users: [] }
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id name } }'
      const endpoint = '/graphql'

      const result = await adapter.request(endpoint, query, {})

      expect(mockGraphQLClient).toHaveBeenCalledWith(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })
      expect(mockClientInstance.request).toHaveBeenCalledWith({
        document: query,
        variables: undefined,
        operationName: undefined,
        requestHeaders: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual({ data: mockResponse })
    })

    it('should include variables in request when provided', async () => {
      const mockResponse = { user: { id: 1 } }
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const variables = { id: '123' }

      const result = await adapter.request('/graphql', query, { variables })

      expect(mockClientInstance.request).toHaveBeenCalledWith({
        document: query,
        variables,
        operationName: undefined,
        requestHeaders: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual({ data: mockResponse })
    })

    it('should include operationName in request when provided', async () => {
      const mockResponse = { user: { id: 1 } }
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const operationName = 'GetUser'

      await adapter.request('/graphql', query, { operationName })

      expect(mockClientInstance.request).toHaveBeenCalledWith({
        document: query,
        variables: undefined,
        operationName,
        requestHeaders: { 'Content-Type': 'application/json' },
      })
    })

    it('should include next options when tags or revalidate are provided', async () => {
      const mockResponse = { users: [] }
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        tags: ['users', 'list'],
        revalidate: 600,
      })

      expect(mockClientInstance.request).toHaveBeenCalledWith({
        document: query,
        variables: undefined,
        operationName: undefined,
        requestHeaders: { 'Content-Type': 'application/json' },
        next: { tags: ['users', 'list'], revalidate: 600 },
      })
    })

    it('should not include next options when tags and revalidate are not provided', async () => {
      const mockResponse = { users: [] }
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {})

      expect(mockClientInstance.request).toHaveBeenCalledWith({
        document: query,
        variables: undefined,
        operationName: undefined,
        requestHeaders: { 'Content-Type': 'application/json' },
      })
      expect(mockClientInstance.request.mock.calls[0][0]).not.toHaveProperty(
        'next',
      )
    })

    it('should handle custom headers', async () => {
      const mockResponse = { users: [] }
      mockClientInstance.request.mockResolvedValue(mockResponse)
      mockCreateHeaders.mockReturnValue({
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      })

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        headers: { Authorization: 'Bearer token' },
      })

      expect(mockCreateHeaders).toHaveBeenCalledWith({
        Authorization: 'Bearer token',
      })
      expect(mockGraphQLClient).toHaveBeenCalledWith('/graphql', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
        signal: undefined,
      })
    })

    it('should handle timeout configuration', async () => {
      const mockResponse = { users: [] }
      const mockSignal = new AbortController().signal
      mockClientInstance.request.mockResolvedValue(mockResponse)
      mockCreateTimeoutSignal.mockReturnValue(mockSignal)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, { timeout: 5000 })

      expect(mockCreateTimeoutSignal).toHaveBeenCalledWith(5000)
      expect(mockGraphQLClient).toHaveBeenCalledWith('/graphql', {
        headers: { 'Content-Type': 'application/json' },
        signal: mockSignal,
      })
    })

    it('should handle GraphQL errors in response', async () => {
      const mockError = {
        response: {
          data: null,
          errors: [{ message: 'User not found' }],
        },
      }
      mockClientInstance.request.mockRejectedValue(mockError)

      const query = 'query { users { id } }'

      const result = await adapter.request('/graphql', query, {})

      expect(result).toEqual({
        data: null,
        errors: [{ message: 'User not found' }],
      })
    })

    it('should rethrow non-GraphQL errors', async () => {
      const networkError = new Error('Network error')
      mockClientInstance.request.mockRejectedValue(networkError)

      const query = 'query { users { id } }'

      await expect(adapter.request('/graphql', query, {})).rejects.toThrow(
        'Network error',
      )
    })
  })

  describe('signal handling', () => {
    it('should use external signal when provided', async () => {
      const mockResponse = { users: [] }
      const externalSignal = new AbortController().signal
      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, { signal: externalSignal })

      expect(mockGraphQLClient).toHaveBeenCalledWith('/graphql', {
        headers: { 'Content-Type': 'application/json' },
        signal: externalSignal,
      })
    })

    it('should combine external and timeout signals', async () => {
      const mockResponse = { users: [] }
      const externalSignal = new AbortController().signal
      const timeoutSignal = new AbortController().signal
      mockClientInstance.request.mockResolvedValue(mockResponse)
      mockCreateTimeoutSignal.mockReturnValue(timeoutSignal)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        signal: externalSignal,
        timeout: 5000,
      })

      expect(mockCreateTimeoutSignal).toHaveBeenCalledWith(5000)
      expect(mockGraphQLClient).toHaveBeenCalledWith('/graphql', {
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(AbortSignal),
      })
    })
  })

  describe('combineSignals method', () => {
    it('should return undefined when no signals provided', () => {
      const result = adapter['combineSignals']()
      expect(result).toBeUndefined()
    })

    it('should return single signal when only one provided', () => {
      const signal = new AbortController().signal
      const result = adapter['combineSignals'](signal)
      expect(result).toBe(signal)
    })

    it('should return single signal when other signals are undefined', () => {
      const signal = new AbortController().signal
      const result = adapter['combineSignals'](signal, undefined, undefined)
      expect(result).toBe(signal)
    })

    it('should combine multiple signals', () => {
      const signal1 = new AbortController().signal
      const signal2 = new AbortController().signal
      const result = adapter['combineSignals'](signal1, signal2)
      expect(result).toBeInstanceOf(AbortSignal)
      expect(result).not.toBe(signal1)
      expect(result).not.toBe(signal2)
    })

    it('should abort combined signal when one of the source signals is already aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      controller1.abort()

      const result = adapter['combineSignals'](
        controller1.signal,
        controller2.signal,
      )
      expect(result?.aborted).toBe(true)
    })

    it('should abort combined signal when source signal is aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()

      const result = adapter['combineSignals'](
        controller1.signal,
        controller2.signal,
      )
      expect(result?.aborted).toBe(false)

      controller1.abort()
      expect(result?.aborted).toBe(true)
    })
  })

  describe('type safety', () => {
    it('should return correctly typed response', async () => {
      interface User {
        id: string
        name: string
        email: string
      }

      interface GetUsersResponse {
        users: User[]
      }

      const mockResponse: GetUsersResponse = {
        users: [
          { id: '1', name: 'John', email: 'john@example.com' },
          { id: '2', name: 'Jane', email: 'jane@example.com' },
        ],
      }

      mockClientInstance.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id name email } }'
      const result = await adapter.request<GetUsersResponse>(
        '/graphql',
        query,
        {},
      )

      expect(result.data).toEqual(mockResponse)
      expect(result.errors).toBeUndefined()
    })
  })
})
