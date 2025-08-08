import { describe, expect, it, vi } from 'vitest'

describe('token.utils', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('should export the correct cookie name in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    const { TOKEN_COOKIE_NAME } = await import('./token.const')
    expect(TOKEN_COOKIE_NAME).toBe('__Secure-auth_token')
  })

  it('should export the correct cookie name in development', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    const { TOKEN_COOKIE_NAME } = await import('./token.const')
    expect(TOKEN_COOKIE_NAME).toBe('dev_token')
  })

  it('should return a Date 15 minutes in the future', async () => {
    const fixedNow = new Date('2025-07-30T12:00:00Z').getTime()
    vi.setSystemTime(fixedNow)

    const { getTokenExpiration } = await import('./token.utils')
    const { TOKEN_EXPIRATION_MINUTES, MILLISECONDS_PER_MINUTE } = await import(
      './token.const'
    )

    const expected = new Date(
      fixedNow + TOKEN_EXPIRATION_MINUTES * MILLISECONDS_PER_MINUTE,
    )

    expect(getTokenExpiration()).toEqual(expected)
  })
})
