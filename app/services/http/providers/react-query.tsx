'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HTTP_CONFIG } from '../core'

interface HttpProviderProps {
  children: React.ReactNode
  showDevtools?: boolean
}

export const HttpProvider = ({ children }: HttpProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: HTTP_CONFIG.DEFAULT_STALE_TIME,
          retry: HTTP_CONFIG.DEFAULT_RETRY_COUNT,
          refetchOnWindowFocus: false,
          refetchOnReconnect: 'always',
        },
        mutations: {
          retry: false,
        },
      },
    })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
