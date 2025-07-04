import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AxiosRestAdapter } from './axios-rest'

// Mock axios
vi.mock('axios', () => {
  return {
    default: {
      create: vi.fn(() => {
        return {
          request: vi.fn(),
        }
      }),
    },
  }
})

// Import the mocked axios
import axios from 'axios'

const mockAxios = vi.mocked(axios)

describe('AxiosRestAdapter', () => {
  let adapter: AxiosRestAdapter
  let mockAxiosInstance: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockAxiosInstance = {
      request: vi.fn(),
    }
    ;(mockAxios.create as ReturnType<typeof vi.fn>).mockReturnValue(
      mockAxiosInstance,
    )
    adapter = new AxiosRestAdapter()
  })

  describe('constructor', () => {
    it('should create adapter with correct name', () => {
      expect(adapter.name).toBe('axios-rest')
    })

    it('should create axios instance with default configuration', () => {
      expect(mockAxios.create).toHaveBeenCalledWith({
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  })

  describe('request method', () => {
    it('should make GET request with correct parameters', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const result = await adapter.request('/api/users', {
        method: 'GET',
        headers: { 'X-Test': 'value' },
        timeout: 5000,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: { 'X-Test': 'value' },
        timeout: 5000,
        signal: undefined,
      })
      expect(result).toEqual({ users: [] })
    })

    it('should make POST request with body', async () => {
      const mockResponse = { data: { id: 1, name: 'test' } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const body = { name: 'test', email: 'test@example.com' }

      const result = await adapter.request('/api/users', {
        method: 'POST',
        body,
        headers: { Authorization: 'Bearer token' },
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/api/users',
        data: body,
        headers: { Authorization: 'Bearer token' },
        timeout: undefined,
        signal: undefined,
      })
      expect(result).toEqual({ id: 1, name: 'test' })
    })

    it('should make PUT request with body', async () => {
      const mockResponse = { data: { id: 1, name: 'updated' } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const body = { name: 'updated', email: 'updated@example.com' }

      await adapter.request('/api/users/1', {
        method: 'PUT',
        body,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'PUT',
        url: '/api/users/1',
        data: body,
        headers: undefined,
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should make DELETE request', async () => {
      const mockResponse = { data: { success: true } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      await adapter.request('/api/users/1', {
        method: 'DELETE',
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/api/users/1',
        data: undefined,
        headers: undefined,
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should handle Headers object', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const headers = new Headers()
      headers.set('Authorization', 'Bearer token')
      headers.set('X-Custom', 'value')

      await adapter.request('/api/users', {
        method: 'GET',
        headers,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: {
          authorization: 'Bearer token',
          'x-custom': 'value',
        },
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should handle headers as array of tuples', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const headers: [string, string][] = [
        ['Authorization', 'Bearer token'],
        ['X-Custom', 'value'],
      ]

      await adapter.request('/api/users', {
        method: 'GET',
        headers,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: {
          Authorization: 'Bearer token',
          'X-Custom': 'value',
        },
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should handle headers as plain object', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const headers = {
        Authorization: 'Bearer token',
        'X-Custom': 'value',
      }

      await adapter.request('/api/users', {
        method: 'GET',
        headers,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: {
          Authorization: 'Bearer token',
          'X-Custom': 'value',
        },
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should handle no headers', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: undefined,
        timeout: undefined,
        signal: undefined,
      })
    })

    it('should handle AbortSignal', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const controller = new AbortController()
      const signal = controller.signal

      await adapter.request('/api/users', {
        method: 'GET',
        signal,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: undefined,
        timeout: undefined,
        signal,
      })
    })

    it('should pass through additional options', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        // These should be passed through to axios
        withCredentials: true,
        maxRedirects: 5,
        validateStatus: (status: number) => {
          return status < 500
        },
      } as Parameters<typeof adapter.request>[1] & {
        withCredentials: boolean
        maxRedirects: number
        validateStatus: (status: number) => boolean
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: undefined,
        timeout: undefined,
        signal: undefined,
        withCredentials: true,
        maxRedirects: 5,
        validateStatus: expect.any(Function),
      })
    })

    it('should handle axios errors', async () => {
      const axiosError = new Error('Network error')
      mockAxiosInstance.request.mockRejectedValue(axiosError)

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('Network error')
    })

    it('should return response data directly', async () => {
      const responseData = { users: [{ id: 1, name: 'John' }] }
      const mockResponse = { data: responseData }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const result = await adapter.request('/api/users', { method: 'GET' })

      expect(result).toEqual(responseData)
      expect(result).not.toHaveProperty('data')
    })
  })

  describe('type safety', () => {
    it('should return correctly typed response', async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      interface GetUsersResponse {
        users: User[]
      }

      const mockResponseData: GetUsersResponse = {
        users: [
          { id: 1, name: 'John', email: 'john@example.com' },
          { id: 2, name: 'Jane', email: 'jane@example.com' },
        ],
      }

      const mockResponse = { data: mockResponseData }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const result = await adapter.request<GetUsersResponse>('/api/users', {
        method: 'GET',
      })

      expect(result).toEqual(mockResponseData)
      expect(result.users).toHaveLength(2)
      expect(result.users[0]).toEqual({
        id: 1,
        name: 'John',
        email: 'john@example.com',
      })
    })
  })

  describe('error handling', () => {
    it('should propagate axios request errors', async () => {
      const error = new Error('Request failed')
      mockAxiosInstance.request.mockRejectedValue(error)

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('Request failed')
    })

    it('should handle axios response errors', async () => {
      const axiosError = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
        message: 'Request failed with status code 404',
      }
      mockAxiosInstance.request.mockRejectedValue(axiosError)

      await expect(
        adapter.request('/api/users/999', { method: 'GET' }),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      })
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error')
      mockAxiosInstance.request.mockRejectedValue(networkError)

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('Network Error')
    })
  })

  describe('configuration', () => {
    it('should use default timeout from constructor', () => {
      expect(mockAxios.create).toHaveBeenCalledWith({
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should allow overriding timeout per request', async () => {
      const mockResponse = { data: { users: [] } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        timeout: 5000,
      })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/api/users',
        data: undefined,
        headers: undefined,
        timeout: 5000,
        signal: undefined,
      })
    })
  })
})
