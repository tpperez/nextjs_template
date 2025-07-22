import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FetchGraphQLAdapter } from '../graphql/adapters'
import { FetchRestAdapter } from '../rest/adapters'

import { HTTP_ADAPTER_CONFIG, HTTP_CONFIG } from './core'

vi.mock('../graphql/adapters', () => {
  return {
    FetchGraphQLAdapter: vi.fn().mockImplementation(() => {
      return {
        request: vi.fn(),
      }
    }),
  }
})

vi.mock('../rest/adapters', () => {
  return {
    FetchRestAdapter: vi.fn().mockImplementation(() => {
      return {
        request: vi.fn(),
      }
    }),
  }
})

describe('HTTP Core Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('HTTP_CONFIG', () => {
    it('should have correct default configuration', () => {
      expect(HTTP_CONFIG).toEqual({
        BASE_URL: expect.any(String),
        GRAPHQL_ENDPOINT: '',
        DEFAULT_REVALIDATE: 300,
        DEFAULT_STALE_TIME: 5 * 60 * 1000,
        DEFAULT_RETRY_COUNT: 1,
        DEFAULT_TIMEOUT: 10000,
      })
    })

    it('should use environment variable for BASE_URL when available', async () => {
      const originalEnv = process.env.NEXT_PUBLIC_API_URL
      process.env.NEXT_PUBLIC_API_URL = 'https://test-api.example.com'

      vi.resetModules()
      const { HTTP_CONFIG: freshConfig } = await import('./core')
      expect(freshConfig.BASE_URL).toBe('https://test-api.example.com')

      process.env.NEXT_PUBLIC_API_URL = originalEnv
    })

    it('should use default BASE_URL when environment variable is not set', async () => {
      const originalEnv = process.env.NEXT_PUBLIC_API_URL
      delete process.env.NEXT_PUBLIC_API_URL

      vi.resetModules()
      const { HTTP_CONFIG: freshConfig } = await import('./core')
      expect(freshConfig.BASE_URL).toBe('http://localhost:3001/api')

      process.env.NEXT_PUBLIC_API_URL = originalEnv
    })
  })

  describe('HTTP_ADAPTER_CONFIG', () => {
    it('should have restAdapter factory function', () => {
      expect(typeof HTTP_ADAPTER_CONFIG.restAdapter).toBe('function')
    })

    it('should have graphqlAdapter factory function', () => {
      expect(typeof HTTP_ADAPTER_CONFIG.graphqlAdapter).toBe('function')
    })

    it('should create FetchRestAdapter instance when restAdapter is called', () => {
      const adapter = HTTP_ADAPTER_CONFIG.restAdapter()
      expect(FetchRestAdapter).toHaveBeenCalled()
      expect(adapter).toBeInstanceOf(Object)
    })

    it('should create FetchGraphQLAdapter instance when graphqlAdapter is called', () => {
      const adapter = HTTP_ADAPTER_CONFIG.graphqlAdapter()
      expect(FetchGraphQLAdapter).toHaveBeenCalled()
      expect(adapter).toBeInstanceOf(Object)
    })

    it('should create new adapter instances on each factory call', () => {
      const adapter1 = HTTP_ADAPTER_CONFIG.restAdapter()
      const adapter2 = HTTP_ADAPTER_CONFIG.restAdapter()

      expect(adapter1).not.toBe(adapter2)
      expect(FetchRestAdapter).toHaveBeenCalledTimes(2)
    })
  })
})
