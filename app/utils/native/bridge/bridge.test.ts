import { beforeEach, describe, expect, it, vi } from 'vitest'

import { NativeInboundEvents, NativeOutboundEvents } from '../events'

import { webviewManagement } from './bridge'

describe('webviewManagement', () => {
  const mockEmit = vi.fn()
  const mockOn = vi.fn()
  const mockOff = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()

    window.nsWebViewInterface = {
      emit: mockEmit,
      on: mockOn,
      off: mockOff,
    } as unknown as typeof window.nsWebViewInterface
  })

  it('should call emit with CLOSE_WEB_VIEW on closeWebView', () => {
    webviewManagement.closeWebView()
    expect(mockEmit).toHaveBeenCalledWith(NativeOutboundEvents.CLOSE_WEB_VIEW)
  })

  it('should call emit with NOTIFY_TOKEN_PAGE_READY on notifyTokenPageReady', () => {
    webviewManagement.notifyTokenPageReady()
    expect(mockEmit).toHaveBeenCalledWith(
      NativeOutboundEvents.NOTIFY_TOKEN_PAGE_READY,
    )
  })

  it('should call on with JWT event on subscribeToJWTMessage', () => {
    const callback = vi.fn()
    webviewManagement.subscribeToJWTMessage(callback)
    expect(mockOn).toHaveBeenCalledWith(NativeInboundEvents.JWT, callback)
  })

  it('should call off with JWT event on unsubscribeFromJWTMessage', () => {
    const callback = vi.fn()
    webviewManagement.unsubscribeFromJWTMessage(callback)
    expect(mockOff).toHaveBeenCalledWith(NativeInboundEvents.JWT, callback)
  })

  it('should not throw if window is undefined (SSR-safe)', () => {
    const originalWindow = globalThis.window
    // @ts-expect-error - Simulates a Server-Side Rendering environment by removing 'window'
    delete globalThis.window

    expect(() => {
      return webviewManagement.closeWebView()
    }).not.toThrow()
    expect(() => {
      return webviewManagement.notifyTokenPageReady()
    }).not.toThrow()
    expect(() => {
      return webviewManagement.subscribeToJWTMessage(() => {})
    }).not.toThrow()
    expect(() => {
      return webviewManagement.unsubscribeFromJWTMessage(() => {})
    }).not.toThrow()

    globalThis.window = originalWindow
  })
})
