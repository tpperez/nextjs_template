import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FetchGraphQLAdapter } from './fetch-graphql'

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
    processResponse: vi.fn(async (response) => {
      if (!response.ok) {
        throw new Error('Request failed')
      }
      return response.json()
    }),
  }
})

import { createTimeoutSignal, processResponse } from '../../core/core.utils'

const mockCreateTimeoutSignal = vi.mocked(createTimeoutSignal)
const mockProcessResponse = vi.mocked(processResponse)

global.fetch = vi.fn()

describe('FetchGraphQLAdapter', () => {
  let adapter: FetchGraphQLAdapter
  let mockFetch: ReturnType<typeof vi.fn>

  const callCombineSignals = (
    adapter: FetchGraphQLAdapter,
    ...signals: (AbortSignal | undefined)[]
  ): AbortSignal | undefined => {
    return (
      adapter as unknown as {
        combineSignals: (
          ...args: (AbortSignal | undefined)[]
        ) => AbortSignal | undefined
      }
    ).combineSignals(...signals)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    adapter = new FetchGraphQLAdapter()
    mockFetch = global.fetch as ReturnType<typeof vi.fn>
  })

  describe('constructor', () => {
    it('should create adapter with correct name', () => {
      expect(adapter.name).toBe('fetch-graphql')
    })
  })

  describe('request method', () => {
    it('should make request without optional parameters', async () => {
      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id name } }'

      await adapter.request('/graphql', query, {})

      expect(mockFetch).toHaveBeenCalledWith('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: undefined,
          operationName: undefined,
        }),
        signal: undefined,
      })
    })

    it('should include variables in payload when provided', async () => {
      const mockResponse = { data: { user: { id: 1 } } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const variables = { id: '123' }

      await adapter.request('/graphql', query, { variables })

      const callArgs = mockFetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)
      expect(body.variables).toEqual(variables)
    })

    it('should include operationName in payload when provided', async () => {
      const mockResponse = { data: { user: { id: 1 } } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const operationName = 'GetUser'

      await adapter.request('/graphql', query, { operationName })

      const callArgs = mockFetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)
      expect(body.operationName).toBe(operationName)
    })

    it('should include next options when tags or revalidate are provided', async () => {
      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        tags: ['users', 'list'],
        revalidate: 600,
      })

      expect(mockFetch).toHaveBeenCalledWith('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: undefined,
          operationName: undefined,
        }),
        signal: undefined,
        next: { tags: ['users', 'list'], revalidate: 600 },
      })
    })

    it('should not include next options when tags and revalidate are not provided', async () => {
      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {})

      expect(mockFetch).toHaveBeenCalledWith('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: undefined,
          operationName: undefined,
        }),
        signal: undefined,
      })
      expect(mockFetch.mock.calls[0][1]).not.toHaveProperty('next')
    })

    it('should handle fetch errors', async () => {
      const fetchError = new Error('Network error')
      mockFetch.mockRejectedValue(fetchError)

      const query = 'query { users { id } }'

      await expect(adapter.request('/graphql', query, {})).rejects.toThrow(
        'Network error',
      )
    })
  })

  describe('signal handling', () => {
    it('should use timeout signal when provided', async () => {
      const mockSignal = new AbortController().signal
      mockCreateTimeoutSignal.mockReturnValue(mockSignal)

      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        timeout: 5000,
      })

      expect(mockCreateTimeoutSignal).toHaveBeenCalledWith(5000)
      expect(mockFetch).toHaveBeenCalledWith('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
        signal: mockSignal,
      })
    })

    it('should combine external signal with timeout signal', async () => {
      const externalSignal = new AbortController().signal
      const timeoutSignal = new AbortController().signal
      mockCreateTimeoutSignal.mockReturnValue(timeoutSignal)

      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {
        timeout: 5000,
        signal: externalSignal,
      })

      expect(mockFetch).toHaveBeenCalledWith('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
        signal: expect.any(AbortSignal),
      })
    })
  })

  describe('combineSignals method', () => {
    it('should return undefined when no signals provided', () => {
      const result = callCombineSignals(adapter)
      expect(result).toBeUndefined()
    })

    it('should return single signal when only one provided', () => {
      const signal = new AbortController().signal
      const result = callCombineSignals(adapter, signal)
      expect(result).toBe(signal)
    })

    it('should return undefined when only undefined signals provided', () => {
      const result = callCombineSignals(adapter, undefined, undefined)
      expect(result).toBeUndefined()
    })

    it('should combine multiple signals', () => {
      const signal1 = new AbortController().signal
      const signal2 = new AbortController().signal
      const result = callCombineSignals(adapter, signal1, signal2)

      expect(result).toBeInstanceOf(AbortSignal)
      expect(result).not.toBe(signal1)
      expect(result).not.toBe(signal2)
    })

    it('should abort combined signal when any input signal is aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      const signal1 = controller1.signal
      const signal2 = controller2.signal

      const result = callCombineSignals(adapter, signal1, signal2)

      expect(result!.aborted).toBe(false)

      controller1.abort()

      expect(result!.aborted).toBe(true)
    })

    it('should handle already aborted signals', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      controller1.abort()

      const result = callCombineSignals(
        adapter,
        controller1.signal,
        controller2.signal,
      )

      expect(result!.aborted).toBe(true)
    })
  })

  describe('GraphQL payload construction', () => {
    it('should construct payload with query only', async () => {
      const mockResponse = { data: { users: [] } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query { users { id } }'

      await adapter.request('/graphql', query, {})

      const callArgs = mockFetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)
      expect(body).toEqual({
        query,
        variables: undefined,
        operationName: undefined,
      })
    })

    it('should construct payload with query and variables', async () => {
      const mockResponse = { data: { user: { id: 1 } } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const variables = { id: '123' }

      await adapter.request('/graphql', query, { variables })

      const callArgs = mockFetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)
      expect(body).toEqual({
        query,
        variables,
        operationName: undefined,
      })
    })

    it('should construct payload with query, variables, and operationName', async () => {
      const mockResponse = { data: { user: { id: 1 } } }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query = 'query GetUser($id: ID!) { user(id: $id) { id } }'
      const variables = { id: '123' }
      const operationName = 'GetUser'

      await adapter.request('/graphql', query, { variables, operationName })

      const callArgs = mockFetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)
      expect(body).toEqual({
        query,
        variables,
        operationName,
      })
    })
  })

  describe('TypeScript generics', () => {
    it('should properly type response data', async () => {
      interface User {
        id: string
        name: string
        email: string
      }

      interface GetUserResponse {
        user: User
      }

      const mockResponse: GetUserResponse = {
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const query =
        'query GetUser($id: ID!) { user(id: $id) { id name email } }'

      const result = await adapter.request<GetUserResponse>('/graphql', query, {
        variables: { id: '1' },
      })

      expect(result).toEqual(mockResponse)
    })
  })
})
