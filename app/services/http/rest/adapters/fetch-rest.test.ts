import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FetchRestAdapter } from './fetch-rest'

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

describe('FetchRestAdapter', () => {
  let adapter: FetchRestAdapter
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    adapter = new FetchRestAdapter()
    mockFetch = global.fetch as ReturnType<typeof vi.fn>
  })

  describe('constructor', () => {
    it('should create adapter with correct name', () => {
      expect(adapter.name).toBe('fetch-rest')
    })
  })

  describe('request method', () => {
    it('should make GET request with correct parameters', async () => {
      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const result = await adapter.request('/api/users', {
        method: 'GET',
        headers: { 'X-Test': 'value' },
        timeout: 5000,
        tags: ['users'],
        revalidate: 300,
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Test': 'value' },
        signal: expect.any(AbortSignal),
        next: { tags: ['users'], revalidate: 300 },
      })
      expect(mockProcessResponse).toHaveBeenCalledWith(mockJsonResponse)
      expect(result).toBe(mockResponse)
    })

    it('should make POST request with body', async () => {
      const mockResponse = { id: 1, name: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      const body = { name: 'test', email: 'test@example.com' }

      await adapter.request('/api/users', {
        method: 'POST',
        body,
        headers: { Authorization: 'Bearer token' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
        body: JSON.stringify(body),
        signal: undefined,
      })
    })

    it('should not include body for GET requests', async () => {
      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        body: { should: 'not be included' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })
      expect(mockFetch.mock.calls[0][1]).not.toHaveProperty('body')
    })

    it('should not include body for DELETE requests', async () => {
      const mockResponse = { success: true }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users/123', {
        method: 'DELETE',
        body: { should: 'not be included' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users/123', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })
      expect(mockFetch.mock.calls[0][1]).not.toHaveProperty('body')
    })

    it('should include next options when tags or revalidate are provided', async () => {
      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        tags: ['users', 'list'],
        revalidate: 600,
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
        next: { tags: ['users', 'list'], revalidate: 600 },
      })
    })

    it('should not include next options when tags and revalidate are not provided', async () => {
      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })
      expect(mockFetch.mock.calls[0][1]).not.toHaveProperty('next')
    })

    it('should handle fetch errors', async () => {
      const fetchError = new Error('Network error')
      mockFetch.mockRejectedValue(fetchError)

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('Network error')
    })

    it('should handle processResponse errors', async () => {
      const mockJsonResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockResolvedValue({}),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockRejectedValue(new Error('Request failed'))

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('Request failed')
    })
  })

  describe('signal handling', () => {
    it('should use timeout signal when provided', async () => {
      const mockSignal = new AbortController().signal
      mockCreateTimeoutSignal.mockReturnValue(mockSignal)

      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        timeout: 5000,
      })

      expect(mockCreateTimeoutSignal).toHaveBeenCalledWith(5000)
      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: mockSignal,
      })
    })

    it('should combine external signal with timeout signal', async () => {
      const externalSignal = new AbortController().signal
      const timeoutSignal = new AbortController().signal
      mockCreateTimeoutSignal.mockReturnValue(timeoutSignal)

      const mockResponse = { data: 'test' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        timeout: 5000,
        signal: externalSignal,
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(AbortSignal),
      })
    })
  })

  describe('combineSignals method', () => {
    type AdapterWithPrivateMethods = {
      combineSignals: (
        ...signals: (AbortSignal | undefined)[]
      ) => AbortSignal | undefined
    }

    it('should return undefined when no signals provided', () => {
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals()
      expect(result).toBeUndefined()
    })

    it('should return single signal when only one provided', () => {
      const signal = new AbortController().signal
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(signal)
      expect(result).toBe(signal)
    })

    it('should return undefined when only undefined signals provided', () => {
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(undefined, undefined)
      expect(result).toBeUndefined()
    })

    it('should combine multiple signals', () => {
      const signal1 = new AbortController().signal
      const signal2 = new AbortController().signal
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(signal1, signal2)

      expect(result).toBeInstanceOf(AbortSignal)
      expect(result).not.toBe(signal1)
      expect(result).not.toBe(signal2)
    })

    it('should abort combined signal when any input signal is aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      const signal1 = controller1.signal
      const signal2 = controller2.signal

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(signal1, signal2)

      expect(result?.aborted).toBe(false)

      controller1.abort()

      expect(result?.aborted).toBe(true)
    })

    it('should handle already aborted signals', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      controller1.abort()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller1.signal, controller2.signal)

      expect(result?.aborted).toBe(true)
    })
  })

  describe('TypeScript generics', () => {
    it('should properly type response data', async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockUser),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)
      mockProcessResponse.mockResolvedValue(mockUser)

      const result = await adapter.request<User>('/api/users/1', {
        method: 'GET',
      })

      expect(result).toEqual(mockUser)
    })
  })
})
