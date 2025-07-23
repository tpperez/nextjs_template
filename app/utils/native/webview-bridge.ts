import { ExternalFn, Fn, TOptionalFunction, TStore } from './native.types'

export class WebViewBridge {
  public eventListenerMap: Record<string, Fn[]> = {}

  private _iosResponseMap: Record<number, TStore> = {}

  private _iosCntResponseId = 0

  init(container = window) {
    container.nsWebViewInterface = this
  }

  _onNativeEvent(eventName: string, payload: TStore) {
    this.eventListenerMap[eventName]?.forEach((listener) => {
      return listener && listener(payload)
    })
  }

  _getResolvedFunction(functionName: string): TOptionalFunction {
    let fnName = functionName.trim()
    fnName =
      fnName.indexOf('window.') === 0 ? fnName.replace('window.', '') : fnName
    const arrFnPath: string[] = fnName.split('.')
    let fn = window as unknown as TOptionalFunction

    arrFnPath.forEach((fnPath: string) => {
      if (fn && !(fnPath in fn)) {
        fn = null
        return
      }
      fn = (fn as Record<string, Fn>)?.[fnPath] as Fn
      return fn
    })

    return fn
  }

  _sendJSCallResponse(reqId: string, response: string, isError?: boolean) {
    const oResponse = {
      reqId,
      response: response || null,
      isError: !!isError,
    }
    this.emit('_jsCallResponse', oResponse)
  }

  _callJSFunction(reqId: string, functionName: string, args: TStore[]) {
    const resolvedFn = this._getResolvedFunction(functionName)
    if (resolvedFn && resolvedFn instanceof Function) {
      const res = resolvedFn.apply(window, args)
      if (res && res instanceof Promise) {
        res.then(
          (value: unknown) => {
            this._sendJSCallResponse(reqId, value as string)
          },
          (error: string) => {
            this._sendJSCallResponse(reqId, error, true)
          },
        )
      } else {
        this._sendJSCallResponse(reqId, res as string)
      }
    }
  }

  _createIFrame(src: string) {
    const rootElm = document.documentElement
    const newFrameElm = document.createElement('IFRAME')
    newFrameElm.setAttribute('src', src)
    rootElm.appendChild(newFrameElm)
    return newFrameElm
  }

  _emitEventToIOS(eventName: string, data: TStore) {
    this._iosResponseMap[++this._iosCntResponseId] = data
    const metadata = { eventName, resId: this._iosCntResponseId }
    const url = `js2ios:${JSON.stringify(metadata)}`
    const iFrame = this._createIFrame(url)
    iFrame.parentNode?.removeChild(iFrame)
  }

  _getIOSResponse(resId: number) {
    const response = this._iosResponseMap[resId]
    delete this._iosResponseMap[resId]
    return response
  }

  _emitEventToAndroid = (eventName: string, data: string) => {
    if (window.androidWebViewInterface?.handleEventFromWebView) {
      window.androidWebViewInterface.handleEventFromWebView(eventName, data)
    } else {
      console.warn(
        `[WebViewBridge] Android bridge not available for event '${eventName}'`,
      )
    }
  }

  on(eventName: string, callback: ExternalFn) {
    if (!this.eventListenerMap[eventName]) {
      this.eventListenerMap[eventName] = [] as Fn[]
    }
    this.eventListenerMap[eventName].push(callback as Fn)
  }

  off(eventName: string, callback: ExternalFn) {
    if (
      !this.eventListenerMap[eventName] ||
      this.eventListenerMap[eventName].length === 0
    ) {
      return
    }

    if (callback) {
      this.eventListenerMap[eventName] = this.eventListenerMap[
        eventName
      ].filter((oldCallback) => {
        return oldCallback !== callback
      })
    } else {
      delete this.eventListenerMap[eventName]
    }
  }

  emit(eventName: string, data?: Record<string, unknown>) {
    const dataContent = typeof data === 'object' ? JSON.stringify(data) : data
    const strData = dataContent || '{}'
    if (window.androidWebViewInterface) {
      this._emitEventToAndroid(eventName, strData)
    } else {
      this._emitEventToIOS(eventName, strData)
    }
  }
}
