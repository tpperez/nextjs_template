'use client'

import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { webviewManagement } from '@/app/utils/native/webview-client'

export const NativeTokenGate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [hasToken, setHasToken] = useState(false)

  const checkIfTokenExists = () => {
    const jwt = Cookies.get('token')
    if (jwt) {
      setHasToken(true)
      return true
    }
    return false
  }

  const handleJWTReceived = (payload: { jwt: string }) => {
    Cookies.set('token', payload.jwt, {
      secure: true,
      sameSite: 'Strict',
      maxAge: 900,
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
    const alreadyHasToken = checkIfTokenExists()
    if (!alreadyHasToken) {
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
