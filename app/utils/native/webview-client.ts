import { NativeInboundEvents, NativeOutboundEvents } from './events-name'

const closeWebView = () => {
  if (typeof window !== 'undefined') {
    window.nsWebViewInterface.emit(NativeOutboundEvents.CLOSE_WEB_VIEW)
  }
}

const notifyTokenPageReady = () => {
  if (typeof window !== 'undefined') {
    window.nsWebViewInterface.emit(NativeOutboundEvents.NOTIFY_TOKEN_PAGE_READY)
  }
}

const subscribeToJWTMessage = (
  callback: (payload: { jwt: string }) => void,
): void => {
  if (typeof window !== 'undefined') {
    window.nsWebViewInterface.on(NativeInboundEvents.JWT, callback)
  }
}

const unsubscribeFromJWTMessage = (
  callback: (payload: { jwt: string }) => void,
): void => {
  if (typeof window !== 'undefined') {
    window.nsWebViewInterface.off(NativeInboundEvents.JWT, callback)
  }
}

export const webviewManagement = {
  closeWebView,
  notifyTokenPageReady,
  subscribeToJWTMessage,
  unsubscribeFromJWTMessage,
}
