'use client'

import { useEffect } from 'react'

import Cookies from 'js-cookie'

import { webviewManagement } from '@/app/utils/native/webview-client'

export const NativeTokenListener = () => {
  useEffect(() => {
    const handleJWT = (payload: { jwt: string }) => {
      // Cookies.set('__Secure-Token', payload.jwt, {
      Cookies.set('token', payload.jwt, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      })
    }

    webviewManagement.subscribeToJWTMessage(handleJWT)
    webviewManagement.notifyTokenPageReady()

    return () => {
      webviewManagement.unsubscribeFromJWTMessage(handleJWT)
    }
  }, [])

  return null
}
