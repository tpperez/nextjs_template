import { GraphQLClient, Variables } from 'graphql-request'

import type {
  IGraphQLHttpAdapter,
  IGraphQLRequestConfig,
  IGraphQLResponse,
} from '../../core/core.type'
import { createHeaders, createTimeoutSignal } from '../../core/core.utils'

export class GraphQLRequestAdapter implements IGraphQLHttpAdapter {
  readonly name = 'graphql-request'

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

    const client = new GraphQLClient(endpoint, {
      headers: finalHeaders,
      signal,
      ...restOptions,
    })

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestOptions: any = {}

      if (tags.length > 0 || revalidate !== undefined) {
        requestOptions.next = { tags, revalidate }
      }

      const data = await client.request<TResponse>({
        document: query,
        variables: variables as Variables,
        operationName,
        requestHeaders: finalHeaders,
        ...requestOptions,
      })

      return {
        data,
      } as IGraphQLResponse<TResponse>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.errors) {
        return {
          data: error.response.data,
          errors: error.response.errors,
        } as IGraphQLResponse<TResponse>
      }

      throw error
    }
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
