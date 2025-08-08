import Cookies from 'js-cookie'
import { type Mock, vi } from 'vitest'

import { getToken } from './token'

vi.mock('js-cookie', () => {
  return {
    default: {
      get: vi.fn(),
    },
  }
})

vi.mock('../token.utils', () => {
  return {
    TOKEN_COOKIE_NAME: 'my-token',
  }
})

describe('getToken', () => {
  it('should return the JWT from cookie if it exists', () => {
    const getMock = Cookies.get as Mock
    getMock.mockReturnValue('jwt-abc')

    expect(getToken()).toBe('jwt-abc')
  })

  it('should return undefined if cookie is not set', () => {
    const getMock = Cookies.get as Mock
    getMock.mockReturnValue(undefined)

    expect(getToken()).toBeUndefined()
  })
})
