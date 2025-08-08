import { beforeEach, describe, expect, it, vi } from 'vitest'

import { WebViewBridge } from './webview'

interface MockWindow {
  nsWebViewInterface?: WebViewBridge
  androidWebViewInterface?: {
    handleEventFromWebView: (eventName: string, data: string) => void
  }
  testFunction?: () => string
  nested?: {
    testFunction?: () => Promise<string>
  }
}

interface MockDocument {
  documentElement: {
    appendChild: (element: MockHTMLElement) => void
  }
  createElement: (tagName: string) => MockHTMLElement
}

interface MockHTMLElement {
  setAttribute: (name: string, value: string) => void
  parentNode?: {
    removeChild: (element: MockHTMLElement) => void
  }
}

interface BridgeWithPrivateProps {
  _iosResponseMap: Record<number, Record<string, unknown>>
}

describe('WebViewBridge', () => {
  let bridge: WebViewBridge
  let mockWindow: MockWindow
  let mockDocument: MockDocument
  let mockElement: MockHTMLElement
  let originalWindow: typeof globalThis.window
  let originalDocument: typeof globalThis.document

  beforeEach(() => {
    vi.clearAllMocks()
    bridge = new WebViewBridge()

    originalWindow = globalThis.window
    originalDocument = globalThis.document

    mockElement = {
      setAttribute: vi.fn(),
      parentNode: {
        removeChild: vi.fn(),
      },
    }

    mockDocument = {
      documentElement: {
        appendChild: vi.fn(),
      },
      createElement: vi.fn().mockReturnValue(mockElement),
    }

    mockWindow = {
      nsWebViewInterface: undefined,
      androidWebViewInterface: undefined,
      testFunction: vi.fn().mockReturnValue(''),
      nested: {
        testFunction: vi.fn().mockResolvedValue(''),
      },
    }

    globalThis.window = mockWindow as unknown as Window & typeof globalThis
    globalThis.document = mockDocument as unknown as Document
  })

  afterEach(() => {
    globalThis.window = originalWindow
    globalThis.document = originalDocument
  })

  describe('init', () => {
    it('should initialize with default window container', () => {
      bridge.init()
      expect(mockWindow.nsWebViewInterface).toBe(bridge)
    })

    it('should initialize with custom container', () => {
      const customContainer = {} as MockWindow
      bridge.init(customContainer as unknown as Window & typeof globalThis)
      expect(customContainer.nsWebViewInterface).toBe(bridge)
    })
  })

  describe('_onNativeEvent', () => {
    it('should call all listeners for event', () => {
      const listener1 = vi.fn()
      const listener2 = vi.fn()
      const payload: Record<string, unknown> = { data: '' }

      bridge.eventListenerMap[''] = [listener1, listener2]
      bridge._onNativeEvent('', payload)

      expect(listener1).toHaveBeenCalledWith(payload)
      expect(listener2).toHaveBeenCalledWith(payload)
    })

    it('should handle event with no listeners', () => {
      expect(() => {
        bridge._onNativeEvent('', {} as Record<string, unknown>)
      }).not.toThrow()
    })

    it('should handle null listener', () => {
      bridge.eventListenerMap[''] = [null as unknown as () => void]

      expect(() => {
        bridge._onNativeEvent('', {} as Record<string, unknown>)
      }).not.toThrow()
    })
  })

  describe('_getResolvedFunction', () => {
    it('should resolve simple function name', () => {
      const result = bridge._getResolvedFunction('testFunction')
      expect(result).toBe(mockWindow.testFunction)
    })

    it('should resolve function with window prefix', () => {
      const result = bridge._getResolvedFunction('window.testFunction')
      expect(result).toBe(mockWindow.testFunction)
    })

    it('should resolve nested function', () => {
      const result = bridge._getResolvedFunction('nested.testFunction')
      expect(result).toBe(mockWindow.nested?.testFunction)
    })

    it('should return null for non-existent function', () => {
      const result = bridge._getResolvedFunction('nonExistent')
      expect(result).toBeNull()
    })

    it('should return null for nested non-existent function', () => {
      const result = bridge._getResolvedFunction('nested.nonExistent')
      expect(result).toBeNull()
    })

    it('should trim function name', () => {
      const result = bridge._getResolvedFunction('  testFunction  ')
      expect(result).toBe(mockWindow.testFunction)
    })
  })

  describe('_sendJSCallResponse', () => {
    it('should emit response with correct format', () => {
      const emitSpy = vi.spyOn(bridge, 'emit')

      bridge._sendJSCallResponse('', '')

      expect(emitSpy).toHaveBeenCalledWith('_jsCallResponse', {
        reqId: '',
        response: null,
        isError: false,
      })
    })

    it('should handle null response', () => {
      const emitSpy = vi.spyOn(bridge, 'emit')

      bridge._sendJSCallResponse('', null as unknown as string)

      expect(emitSpy).toHaveBeenCalledWith('_jsCallResponse', {
        reqId: '',
        response: null,
        isError: false,
      })
    })

    it('should handle error response', () => {
      const emitSpy = vi.spyOn(bridge, 'emit')

      bridge._sendJSCallResponse('', '', true)

      expect(emitSpy).toHaveBeenCalledWith('_jsCallResponse', {
        reqId: '',
        response: null,
        isError: true,
      })
    })

    it('should handle non-empty response', () => {
      const emitSpy = vi.spyOn(bridge, 'emit')

      bridge._sendJSCallResponse('', 'data')

      expect(emitSpy).toHaveBeenCalledWith('_jsCallResponse', {
        reqId: '',
        response: 'data',
        isError: false,
      })
    })
  })

  describe('_callJSFunction', () => {
    it('should call function and send response', () => {
      const sendResponseSpy = vi.spyOn(bridge, '_sendJSCallResponse')

      bridge._callJSFunction('', 'testFunction', [])

      expect(mockWindow.testFunction).toHaveBeenCalled()
      expect(sendResponseSpy).toHaveBeenCalledWith('', '')
    })

    it('should handle promise resolution', async () => {
      const sendResponseSpy = vi.spyOn(bridge, '_sendJSCallResponse')

      bridge._callJSFunction('', 'nested.testFunction', [])

      await new Promise((resolve) => {
        return setTimeout(resolve, 0)
      })

      expect(sendResponseSpy).toHaveBeenCalledWith('', '')
    })

    it('should handle promise rejection', async () => {
      const mockPromiseFunction = vi.fn().mockRejectedValue('')
      mockWindow.nested = { testFunction: mockPromiseFunction }
      const sendResponseSpy = vi.spyOn(bridge, '_sendJSCallResponse')

      bridge._callJSFunction('', 'nested.testFunction', [])

      await new Promise((resolve) => {
        return setTimeout(resolve, 0)
      })

      expect(sendResponseSpy).toHaveBeenCalledWith('', '', true)
    })

    it('should handle non-existent function', () => {
      const sendResponseSpy = vi.spyOn(bridge, '_sendJSCallResponse')

      bridge._callJSFunction('', 'nonExistent', [])

      expect(sendResponseSpy).not.toHaveBeenCalled()
    })
  })

  describe('_createIFrame', () => {
    it('should create iframe with src attribute', () => {
      const iframe = bridge._createIFrame('')

      expect(mockDocument.createElement).toHaveBeenCalledWith('IFRAME')
      expect(mockElement.setAttribute).toHaveBeenCalledWith('src', '')
      expect(mockDocument.documentElement.appendChild).toHaveBeenCalledWith(
        mockElement,
      )
      expect(iframe).toBe(mockElement)
    })
  })

  describe('_emitEventToIOS', () => {
    it('should create iframe and increment response id', () => {
      const createIFrameSpy = vi
        .spyOn(bridge, '_createIFrame')
        .mockReturnValue(mockElement as unknown as HTMLElement)

      bridge._emitEventToIOS('', {})

      expect(createIFrameSpy).toHaveBeenCalledWith(
        'js2ios:{"eventName":"","resId":1}',
      )
      expect(mockElement.parentNode?.removeChild).toHaveBeenCalledWith(
        mockElement,
      )
    })

    it('should handle multiple calls with incrementing ids', () => {
      const createIFrameSpy = vi
        .spyOn(bridge, '_createIFrame')
        .mockReturnValue(mockElement as unknown as HTMLElement)

      bridge._emitEventToIOS('', {})
      bridge._emitEventToIOS('', {})

      expect(createIFrameSpy).toHaveBeenLastCalledWith(
        'js2ios:{"eventName":"","resId":2}',
      )
    })
  })

  describe('_getIOSResponse', () => {
    it('should return and delete response', () => {
      const data = { test: '' }
      const bridgeWithPrivate = bridge as unknown as BridgeWithPrivateProps
      bridgeWithPrivate._iosResponseMap[1] = data

      const result = bridge._getIOSResponse(1)

      expect(result).toBe(data)
      expect(bridgeWithPrivate._iosResponseMap[1]).toBeUndefined()
    })
  })

  describe('_emitEventToAndroid', () => {
    it('should call android interface when available', () => {
      const handleEventFromWebView = vi.fn()
      mockWindow.androidWebViewInterface = { handleEventFromWebView }

      bridge._emitEventToAndroid('', '')

      expect(handleEventFromWebView).toHaveBeenCalledWith('', '')
    })

    it('should warn when android interface not available', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockWindow.androidWebViewInterface = undefined

      bridge._emitEventToAndroid('', '')

      expect(consoleSpy).toHaveBeenCalledWith(
        "[WebViewBridge] Android bridge not available for event ''",
      )
    })
  })

  describe('on', () => {
    it('should add event listener', () => {
      const callback = vi.fn()

      bridge.on('', callback)

      expect(bridge.eventListenerMap['']).toContain(callback)
    })

    it('should create event array if not exists', () => {
      const callback = vi.fn()

      bridge.on('', callback)

      expect(Array.isArray(bridge.eventListenerMap[''])).toBe(true)
    })
  })

  describe('off', () => {
    it('should remove specific callback', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()
      bridge.eventListenerMap[''] = [callback1, callback2]

      bridge.off('', callback1)

      expect(bridge.eventListenerMap['']).toEqual([callback2])
    })

    it('should remove all callbacks when no callback provided', () => {
      const callback = vi.fn()
      bridge.eventListenerMap[''] = [callback]

      bridge.off('', null as unknown as () => void)

      expect(bridge.eventListenerMap['']).toBeUndefined()
    })

    it('should handle non-existent event', () => {
      expect(() => {
        bridge.off('', vi.fn())
      }).not.toThrow()
    })

    it('should handle empty event listener array', () => {
      bridge.eventListenerMap[''] = []

      expect(() => {
        bridge.off('', vi.fn())
      }).not.toThrow()
    })
  })

  describe('emit', () => {
    it('should emit to android when interface available', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToAndroid')
      mockWindow.androidWebViewInterface = { handleEventFromWebView: vi.fn() }

      bridge.emit('')

      expect(emitSpy).toHaveBeenCalledWith('', '{}')
    })

    it('should emit to ios when android interface not available', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToIOS')
      mockWindow.androidWebViewInterface = undefined

      bridge.emit('')

      expect(emitSpy).toHaveBeenCalledWith('', '{}')
    })

    it('should stringify object data', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToAndroid')
      mockWindow.androidWebViewInterface = { handleEventFromWebView: vi.fn() }
      const data = { key: '' }

      bridge.emit('', data)

      expect(emitSpy).toHaveBeenCalledWith('', '{"key":""}')
    })

    it('should handle string data', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToAndroid')
      mockWindow.androidWebViewInterface = { handleEventFromWebView: vi.fn() }

      bridge.emit('', '' as unknown as Record<string, unknown>)

      expect(emitSpy).toHaveBeenCalledWith('', '{}')
    })

    it('should handle non-empty string data', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToAndroid')
      mockWindow.androidWebViewInterface = { handleEventFromWebView: vi.fn() }

      bridge.emit('', 'data' as unknown as Record<string, unknown>)

      expect(emitSpy).toHaveBeenCalledWith('', 'data')
    })

    it('should use empty object when no data provided', () => {
      const emitSpy = vi.spyOn(bridge, '_emitEventToAndroid')
      mockWindow.androidWebViewInterface = { handleEventFromWebView: vi.fn() }

      bridge.emit('')

      expect(emitSpy).toHaveBeenCalledWith('', '{}')
    })
  })
})
