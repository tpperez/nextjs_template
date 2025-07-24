'use client'

import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { getTokenExpiration, TOKEN_COOKIE_NAME } from './token.utils'
import { webviewManagement } from './webview-client'

export const NativeTokenGate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [hasToken, setHasToken] = useState(false)

  const checkIfTokenExists = (): boolean => {
    const jwt = Cookies.get(TOKEN_COOKIE_NAME)
    const tokenExists = Boolean(jwt)
    setHasToken(tokenExists)
    return tokenExists
  }

  const handleJWTReceived = (payload: { jwt: string }) => {
    if (!payload.jwt) return

    Cookies.set(TOKEN_COOKIE_NAME, payload.jwt, {
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
      expires: getTokenExpiration(),
      path: '/',
    })

    setHasToken(true)
  }

  const subscribeToJWT = () => {
    webviewManagement.subscribeToJWTMessage(handleJWTReceived)
    webviewManagement.notifyTokenPageReady()

    return () => {
      webviewManagement.unsubscribeFromJWTMessage(handleJWTReceived)
    }
  }

  useEffect(() => {
    if (!checkIfTokenExists()) {
      return subscribeToJWT()
    }
  }, [])

  if (!hasToken) {
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent' />
        <p className='text-sm text-gray-500'>Esperando autorización…</p>
      </div>
    )
  }

  return <>{children}</>
}
