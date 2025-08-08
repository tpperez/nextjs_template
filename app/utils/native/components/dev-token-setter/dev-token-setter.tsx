'use client'

import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { getTokenExpiration, TOKEN_COOKIE_NAME } from '../../token'

const DevTokenSetter = () => {
  const [jwt, setJwt] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [hasToken, setHasToken] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME)
    setHasToken(!!token)
  }, [])

  const handleSubmit = () => {
    if (!jwt) {
      setError('Invalid JWT')
      return
    }

    Cookies.set(TOKEN_COOKIE_NAME, jwt, {
      sameSite: 'Strict',
      secure: false,
      expires: getTokenExpiration(),
      path: '/',
    })

    setSuccess(true)
    location.reload()
  }

  const handleClearToken = () => {
    Cookies.remove(TOKEN_COOKIE_NAME)
    setJwt('')
    setSuccess(false)
    setError('')
    location.reload()
  }

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {!expanded ? (
        <button
          onClick={() => {
            return setExpanded(true)
          }}
          className='rounded bg-black px-3 py-2 text-xs text-white shadow-md hover:bg-gray-800'
        >
          {hasToken ? 'Change token (dev)' : 'Set token (dev)'}
        </button>
      ) : (
        <div className='w-[320px] rounded-md border border-gray-300 bg-white p-4 shadow-lg'>
          <p className='mb-2 text-sm font-semibold'>Set token manually (DEV)</p>

          <textarea
            placeholder='Paste your JWT here'
            className='mb-2 w-full rounded border px-2 py-1 font-mono text-sm'
            rows={4}
            value={jwt}
            onChange={(e) => {
              return setJwt(e.target.value)
            }}
          />

          <button
            onClick={handleSubmit}
            className='mb-2 w-full rounded bg-black px-2 py-1 text-sm text-white hover:bg-gray-800'
          >
            Set token
          </button>

          {hasToken && (
            <button
              onClick={handleClearToken}
              className='mb-2 w-full rounded border border-gray-400 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100'
            >
              Clear token
            </button>
          )}

          {error && <p className='text-xs text-red-500'>{error}</p>}
          {success && (
            <p className='text-xs text-green-600'>Token set. Reloading...</p>
          )}

          <button
            onClick={() => {
              return setExpanded(false)
            }}
            className='mt-2 w-full text-center text-xs text-gray-500 underline'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default DevTokenSetter
