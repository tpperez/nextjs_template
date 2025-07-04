import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildUrl,
  createHeaders,
  createTimeoutSignal,
  processResponse,
  resolveBaseUrl,
} from './core.utils'

vi.mock('./core', () => {
  return {
    HTTP_CONFIG: {
      BASE_URL: 'http://localhost:3001/api',
    },
  }
})

describe('HTTP Core Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('resolveBaseUrl', () => {
    it('should return provided baseUrl when given', () => {
      const customUrl = 'https://custom-api.example.com'
      const result = resolveBaseUrl(customUrl)
      expect(result).toBe(customUrl)
    })

    it('should return default BASE_URL when no baseUrl provided', () => {
      const result = resolveBaseUrl()
      expect(result).toBe('http://localhost:3001/api')
    })

    it('should return default BASE_URL when baseUrl is empty string', () => {
      const result = resolveBaseUrl('')
      expect(result).toBe('http://localhost:3001/api')
    })
  })

  describe('createHeaders', () => {
    it('should create headers with default Content-Type', () => {
      const headers = createHeaders()
      expect(headers).toEqual({
        'Content-Type': 'application/json',
      })
    })

    it('should merge custom headers with default headers', () => {
      const customHeaders = {
        Authorization: 'Bearer token',
        'X-Custom-Header': 'value',
      }
      const headers = createHeaders(customHeaders)
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
        'X-Custom-Header': 'value',
      })
    })

    it('should override default Content-Type when provided in custom headers', () => {
      const customHeaders = {
        'Content-Type': 'text/plain',
      }
      const headers = createHeaders(customHeaders)
      expect(headers).toEqual({
        'Content-Type': 'text/plain',
      })
    })
  })

  describe('processResponse', () => {
    it('should return parsed JSON when response is ok', async () => {
      const mockData = { id: 1, name: 'test' }
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      } as unknown as Response

      const result = await processResponse<typeof mockData>(mockResponse)
      expect(result).toEqual(mockData)
    })

    it('should return empty object when response is ok but JSON parsing fails', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('JSON parse error')),
      } as unknown as Response

      const result =
        await processResponse<Record<string, unknown>>(mockResponse)
      expect(result).toEqual({})
    })

    it('should throw error with status and message when response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: vi.fn().mockResolvedValue({}),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toThrow()
      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Not Found',
        status: 404,
      })
    })

    it('should include error details from response body when available', async () => {
      const errorBody = {
        message: 'Custom error message',
        code: 'VALIDATION_ERROR',
        details: { field: 'email' },
      }
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: vi.fn().mockResolvedValue(errorBody),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Custom error message',
        status: 400,
        details: errorBody,
        code: 'VALIDATION_ERROR',
      })
    })

    it('should handle JSON parsing error in error response gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockRejectedValue(new Error('JSON parse error')),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Internal Server Error',
        status: 500,
      })
    })
  })

  describe('createTimeoutSignal', () => {
    it('should return undefined when no timeout provided', () => {
      const signal = createTimeoutSignal()
      expect(signal).toBeUndefined()
    })

    it('should return AbortSignal when timeout is provided', () => {
      const signal = createTimeoutSignal(5000)
      expect(signal).toBeInstanceOf(AbortSignal)
    })

    it('should abort signal after specified timeout', async () => {
      const timeout = 100
      const signal = createTimeoutSignal(timeout)

      expect(signal).toBeInstanceOf(AbortSignal)
      expect(signal?.aborted).toBe(false)

      await new Promise((resolve) => {
        return setTimeout(resolve, timeout + 50)
      })

      expect(signal?.aborted).toBe(true)
    })
  })

  describe('buildUrl', () => {
    it('should correctly join baseUrl and path', () => {
      const baseUrl = 'https://api.example.com'
      const path = 'users'
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/users')
    })

    it('should handle baseUrl with trailing slash', () => {
      const baseUrl = 'https://api.example.com/'
      const path = 'users'
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/users')
    })

    it('should handle path with leading slash', () => {
      const baseUrl = 'https://api.example.com'
      const path = '/users'
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/users')
    })

    it('should handle both baseUrl with trailing slash and path with leading slash', () => {
      const baseUrl = 'https://api.example.com/'
      const path = '/users'
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/users')
    })

    it('should handle empty path', () => {
      const baseUrl = 'https://api.example.com'
      const path = ''
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/')
    })

    it('should handle complex paths with multiple segments', () => {
      const baseUrl = 'https://api.example.com'
      const path = 'users/123/posts'
      const result = buildUrl(baseUrl, path)
      expect(result).toBe('https://api.example.com/users/123/posts')
    })
  })
})
