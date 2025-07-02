import { HttpRequestConfig, RestHttpAdapter } from '../../core'
import {
  createHeaders,
  processResponse,
  createTimeoutSignal,
} from '../../core/core.utils'

export class FetchRestAdapter implements RestHttpAdapter {
  readonly name = 'fetch-rest'

  async request<TResponse>(
    url: string,
    config: HttpRequestConfig,
  ): Promise<TResponse> {
    const {
      method,
      body,
      headers,
      timeout,
      tags = [],
      revalidate,
      signal: externalSignal,
      ...restOptions
    } = config

    const finalHeaders = createHeaders(headers)
    const timeoutSignal = createTimeoutSignal(timeout)

    const signal = this.combineSignals(externalSignal, timeoutSignal)

    const requestInit: RequestInit = {
      method,
      headers: finalHeaders,
      signal,
      ...restOptions,
    }

    if (body && method !== 'GET' && method !== 'DELETE') {
      requestInit.body = JSON.stringify(body)
    }

    if (tags.length > 0 || revalidate !== undefined) {
      requestInit.next = { tags, revalidate }
    }

    const response = await fetch(url, requestInit)
    return processResponse<TResponse>(response)
  }

  private combineSignals(
    ...signals: (AbortSignal | undefined)[]
  ): AbortSignal | undefined {
    const validSignals = signals.filter(Boolean) as AbortSignal[]

    if (validSignals.length === 0) return undefined
    if (validSignals.length === 1) return validSignals[0]

    const controller = new AbortController()

    for (const signal of validSignals) {
      if (signal.aborted) {
        controller.abort()
        break
      }
      signal.addEventListener(
        'abort',
        () => {
          return controller.abort()
        },
        { once: true },
      )
    }

    return controller.signal
  }
}
