import { render } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

import NativeBridgeProvider from './native-bridge-provider'

const mockInit = vi.fn()
const mockWebViewBridgeInstance = { init: mockInit }

vi.mock('../bridge/webview', () => {
  return {
    WebViewBridge: vi.fn(() => {
      return mockWebViewBridgeInstance
    }),
  }
})

describe('<NativeBridgeProvider />', () => {
  afterEach(() => {
    mockInit.mockClear()
    // @ts-expect-error: nsWebViewInterface is only injected by the native app
    delete window.nsWebViewInterface
  })

  it('should initialize WebViewBridge when nsWebViewInterface is not defined', () => {
    render(<NativeBridgeProvider />)
    expect(mockInit).toHaveBeenCalledTimes(1)
  })

  it('should not initialize WebViewBridge when nsWebViewInterface is already defined', () => {
    const mockInterface = {}
    // @ts-expect-error: we're mocking an interface that doesn't exist in the Window type
    window.nsWebViewInterface = mockInterface

    render(<NativeBridgeProvider />)
    expect(mockInit).not.toHaveBeenCalled()
  })
})
