import {
  createHeaders,
  processResponse,
  createTimeoutSignal,
} from '../../core/core.utils'
import type {
  GraphQLHttpAdapter,
  GraphQLRequestConfig,
  GraphQLResponse,
} from '../../core/core.type'

interface GraphQLRequestPayload {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

export class FetchGraphQLAdapter implements GraphQLHttpAdapter {
  readonly name = 'fetch-graphql'

  async request<TResponse>(
    endpoint: string,
    query: string,
    config: GraphQLRequestConfig,
  ): Promise<GraphQLResponse<TResponse>> {
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

    const payload: GraphQLRequestPayload = {
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
    return processResponse<GraphQLResponse<TResponse>>(response)
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
