import type {
  IGraphQLHttpAdapter,
  IGraphQLRequestConfig,
  IGraphQLResponse,
} from '../../core/core.type'
import {
  createHeaders,
  createTimeoutSignal,
  processResponse,
} from '../../core/core.utils'

interface IGraphQLRequestPayload {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

export class FetchGraphQLAdapter implements IGraphQLHttpAdapter {
  readonly name = 'fetch-graphql'

  async request<TResponse>(
    endpoint: string,
    query: string,
    config: IGraphQLRequestConfig,
  ): Promise<IGraphQLResponse<TResponse>> {
    const {
      variables,
      operationName,
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

    const payload: IGraphQLRequestPayload = {
      query,
      variables,
      operationName,
    }

    const requestInit: RequestInit = {
      method: 'POST',
      headers: finalHeaders,
      body: JSON.stringify(payload),
      signal,
      ...restOptions,
    }

    if (tags.length > 0 || revalidate !== undefined) {
      requestInit.next = { tags, revalidate }
    }

    const response = await fetch(endpoint, requestInit)
    return processResponse<IGraphQLResponse<TResponse>>(response)
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
