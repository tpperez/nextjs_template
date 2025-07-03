import { HTTP_CONFIG } from './core'
import type { IHttpError } from './core.type'

export const resolveBaseUrl = (baseUrl?: string): string => {
  return baseUrl || HTTP_CONFIG.BASE_URL
}

export const createHeaders = (customHeaders?: HeadersInit): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    ...customHeaders,
  }
}

export const processResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: IHttpError = {
      message: response.statusText || 'Request failed',
      status: response.status,
    }

    try {
      const errorBody = await response.json()
      error.details = errorBody
      if (errorBody.message) {
        error.message = errorBody.message
      }
      if (errorBody.code) {
        error.code = errorBody.code
      }
    } catch {}

    throw error
  }

  try {
    return await response.json()
  } catch {
    return {} as T
  }
}

export const createTimeoutSignal = (
  timeout?: number,
): AbortSignal | undefined => {
  if (!timeout) return undefined

  const controller = new AbortController()
  setTimeout(() => {
    return controller.abort()
  }, timeout)
  return controller.signal
}

export const buildUrl = (baseUrl: string, path: string): string => {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')

  return `${cleanBaseUrl}/${cleanPath}`
}
