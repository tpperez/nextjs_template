'use client'

import { useEffect } from 'react'

import { WebViewBridge } from '../bridge'

const NativeBridgeProvider = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.nsWebViewInterface) {
      const bridge = new WebViewBridge()
      bridge.init()
    }
  }, [])

  return null
}

export default NativeBridgeProvider
