'use client'

import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

export const NativeTokenGate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    // const jwt = Cookies.get('__Secure-Token')
    const jwt = Cookies.get('token')
    if (jwt) {
      setHasToken(true)
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
