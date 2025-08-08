import {
  MILLISECONDS_PER_MINUTE,
  TOKEN_EXPIRATION_MINUTES,
} from './token.const'

export const getTokenExpiration = () => {
  return new Date(
    Date.now() + TOKEN_EXPIRATION_MINUTES * MILLISECONDS_PER_MINUTE,
  )
}
