export const TOKEN_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Secure-auth_token' : 'dev_token'

export const TOKEN_EXPIRATION_MINUTES = 15
export const MILLISECONDS_PER_MINUTE = 60 * 1000
