import { act, render, screen, waitFor } from '@testing-library/react'
import Cookies from 'js-cookie'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { webviewManagement } from '../../bridge'
import { getTokenExpiration } from '../../token'

import NativeTokenGate from './native-token-gate'

vi.mock('js-cookie', () => {
  return {
    default: {
      get: vi.fn(),
      set: vi.fn(),
    },
  }
})

vi.mock('@/app/utils/native/bridge', () => {
  return {
    webviewManagement: {
      subscribeToJWTMessage: vi.fn(),
      unsubscribeFromJWTMessage: vi.fn(),
      notifyTokenPageReady: vi.fn(),
    },
  }
})

vi.mock('@/app/utils/native/token/token.utils', () => {
  return {
    getTokenExpiration: vi.fn(),
  }
})

vi.mock('@/app/utils/native/token/token.const', () => {
  return {
    TOKEN_COOKIE_NAME: '',
  }
})

describe('NativeTokenGate', () => {
  const mockCookiesGet = Cookies.get as unknown as ReturnType<typeof vi.fn>
  const mockCookiesSet = Cookies.set as unknown as ReturnType<typeof vi.fn>
  const mockSubscribe = vi.mocked(webviewManagement.subscribeToJWTMessage)
  const mockUnsubscribe = vi.mocked(webviewManagement.unsubscribeFromJWTMessage)
  const mockNotify = vi.mocked(webviewManagement.notifyTokenPageReady)
  const mockGetTokenExpiration = vi.mocked(getTokenExpiration)

  beforeEach(() => {
    vi.clearAllMocks()
    mockGetTokenExpiration.mockReturnValue(
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    )
    vi.stubEnv('NODE_ENV', 'development')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('should render children when token exists', () => {
    mockCookiesGet.mockReturnValue('test')

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('should show loader when token does not exist', () => {
    mockCookiesGet.mockReturnValue(undefined)

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(screen.getByText('waiting for authorization…')).toBeInTheDocument()
    expect(screen.queryByTestId('child')).not.toBeInTheDocument()
  })

  it('should subscribe to JWT messages when token does not exist', () => {
    mockCookiesGet.mockReturnValue(undefined)

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(mockSubscribe).toHaveBeenCalled()
    expect(mockNotify).toHaveBeenCalled()
  })

  it('should not subscribe when token exists', () => {
    mockCookiesGet.mockReturnValue('test')

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(mockSubscribe).not.toHaveBeenCalled()
    expect(mockNotify).not.toHaveBeenCalled()
  })

  it('should handle JWT received and save cookie', async () => {
    mockCookiesGet.mockReturnValue(undefined)

    let jwtCallback: ((payload: { jwt: string }) => void) | undefined
    mockSubscribe.mockImplementation(
      (callback: (payload: { jwt: string }) => void) => {
        jwtCallback = callback
      },
    )

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(screen.getByText('waiting for authorization…')).toBeInTheDocument()

    await act(async () => {
      if (jwtCallback) {
        jwtCallback({ jwt: 'test' })
      }
    })

    expect(mockCookiesSet).toHaveBeenCalledWith('', 'test', {
      sameSite: 'Strict',
      secure: false,
      expires: expect.any(Date),
      path: '/',
    })

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })
  })

  it('should set secure cookie in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    mockCookiesGet.mockReturnValue(undefined)

    let jwtCallback: ((payload: { jwt: string }) => void) | undefined
    mockSubscribe.mockImplementation(
      (callback: (payload: { jwt: string }) => void) => {
        jwtCallback = callback
      },
    )

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    await act(async () => {
      if (jwtCallback) {
        jwtCallback({ jwt: 'test' })
      }
    })

    expect(mockCookiesSet).toHaveBeenCalledWith('', 'test', {
      sameSite: 'Strict',
      secure: true,
      expires: expect.any(Date),
      path: '/',
    })
  })

  it('should not handle empty JWT payload', async () => {
    mockCookiesGet.mockReturnValue(undefined)

    let jwtCallback: ((payload: { jwt: string }) => void) | undefined
    mockSubscribe.mockImplementation(
      (callback: (payload: { jwt: string }) => void) => {
        jwtCallback = callback
      },
    )

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    await act(async () => {
      if (jwtCallback) {
        jwtCallback({ jwt: '' })
      }
    })

    expect(mockCookiesSet).not.toHaveBeenCalled()
  })

  it('should not handle JWT payload without jwt property', async () => {
    mockCookiesGet.mockReturnValue(undefined)

    let jwtCallback: ((payload: { jwt: string }) => void) | undefined
    mockSubscribe.mockImplementation(
      (callback: (payload: { jwt: string }) => void) => {
        jwtCallback = callback
      },
    )

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    await act(async () => {
      if (jwtCallback) {
        jwtCallback({ jwt: null as unknown as string })
      }
    })

    expect(mockCookiesSet).not.toHaveBeenCalled()
  })

  it('should unsubscribe on cleanup', () => {
    mockCookiesGet.mockReturnValue(undefined)

    const { unmount } = render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    unmount()

    expect(mockUnsubscribe).toHaveBeenCalled()
  })

  it('should use token expiration from utils', async () => {
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    mockGetTokenExpiration.mockReturnValue(expirationDate)
    mockCookiesGet.mockReturnValue(undefined)

    let jwtCallback: ((payload: { jwt: string }) => void) | undefined
    mockSubscribe.mockImplementation(
      (callback: (payload: { jwt: string }) => void) => {
        jwtCallback = callback
      },
    )

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    await act(async () => {
      if (jwtCallback) {
        jwtCallback({ jwt: 'test' })
      }
    })

    expect(mockCookiesSet).toHaveBeenCalledWith('', 'test', {
      sameSite: 'Strict',
      secure: false,
      expires: expirationDate,
      path: '/',
    })
  })

  it('should check token exists using correct cookie name', () => {
    mockCookiesGet.mockReturnValue('test')

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    expect(mockCookiesGet).toHaveBeenCalledWith('')
  })

  it('should render loading spinner with correct classes', () => {
    mockCookiesGet.mockReturnValue(undefined)

    const { container } = render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toHaveClass(
      'h-5',
      'w-5',
      'animate-spin',
      'rounded-full',
      'border-2',
      'border-gray-400',
      'border-t-transparent',
    )
  })

  it('should render loading container with correct classes', () => {
    mockCookiesGet.mockReturnValue(undefined)

    render(
      <NativeTokenGate>
        <div data-testid='child'></div>
      </NativeTokenGate>,
    )

    const container = screen.getByText(
      'waiting for authorization…',
    ).parentElement
    expect(container).toHaveClass(
      'flex',
      'h-screen',
      'w-full',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-2',
    )
  })
})
