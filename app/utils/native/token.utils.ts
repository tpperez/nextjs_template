export const TOKEN_COOKIE_NAME = 'token'
export const TOKEN_EXPIRATION_MINUTES = 15
export const MILLISECONDS_PER_MINUTE = 60 * 1000

export const getTokenExpiration = () => {
  return new Date(
    Date.now() + TOKEN_EXPIRATION_MINUTES * MILLISECONDS_PER_MINUTE,
  )
}
