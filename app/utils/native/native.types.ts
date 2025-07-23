import { WebViewBridge } from './webview-bridge'

declare global {
  interface Window {
    nsWebViewInterface: WebViewBridge
    androidWebViewInterface?: {
      handleEventFromWebView: (eventName: string, payload: string) => void
    }
  }
}

interface EventPayload {
  url?: string
  tag?: string
}

interface JWTEventPayload {
  jwt: string
}

export type TStore = string | EventPayload | JWTEventPayload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExternalFn = (...args: any) => void
export type Fn = (...args: TStore[]) => TStore | Promise<TStore> | void
export type TOptionalFunction = Fn | Record<string, Fn> | null

export interface NativeWindow {
  nsWebViewInterface: WebViewBridge
  androidWebViewInterface: {
    handleEventFromWebView: (eventName: string, payload: string) => void
  }
}
