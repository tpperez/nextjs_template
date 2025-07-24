'use client'

import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { webviewManagement } from '@/app/utils/native/webview-client'

const TOKEN_COOKIE_NAME = 'token'
const TOKEN_EXPIRATION_MINUTES = 15
const MILLISECONDS_PER_MINUTE = 60 * 1000

export const NativeTokenGate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [hasToken, setHasToken] = useState(false)

  const getTokenExpiration = () => {
    return new Date(
      Date.now() + TOKEN_EXPIRATION_MINUTES * MILLISECONDS_PER_MINUTE,
    )
  }

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
