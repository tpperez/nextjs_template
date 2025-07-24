'use client'

import { useEffect } from 'react'

import { WebViewBridge } from './webview-bridge'

export const NativeBridgeProvider = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.nsWebViewInterface) {
      const bridge = new WebViewBridge()
      bridge.init()
    }
  }, [])

  return null
}
