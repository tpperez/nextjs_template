import {
  buildUrl,
  HTTP_ADAPTER_CONFIG,
  HTTP_CONFIG,
  type IGraphQLHttpAdapter,
  resolveBaseUrl,
} from '../core'

import type { IGraphQLRequestOptions, IGraphQLResponse } from './graphql.type'

class GraphQLClient {
  private adapter: IGraphQLHttpAdapter

  constructor() {
    const adapterFactory = HTTP_ADAPTER_CONFIG.graphqlAdapter
    this.adapter = adapterFactory()
  }

  async request<TResponse, TVariables = Record<string, unknown>>(
    query: string,
    options: IGraphQLRequestOptions<TVariables> = {},
  ): Promise<IGraphQLResponse<TResponse>> {
    const {
      variables,
      operationName,
      headers,
      baseUrl,
      timeout,
      tags = [],
      revalidate,
      ...restOptions
    } = options

    const finalBaseUrl = resolveBaseUrl(baseUrl)
    const endpoint = buildUrl(finalBaseUrl, HTTP_CONFIG.GRAPHQL_ENDPOINT)

    return this.adapter.request<TResponse>(endpoint, query, {
      variables: variables as Record<string, unknown> | undefined,
      operationName,
      headers,
      baseUrl,
      timeout,
      tags,
      revalidate,
      ...restOptions,
    })
  }

  query<TResponse, TVariables = Record<string, unknown>>(
    query: string,
    variables?: TVariables,
    options?: Omit<IGraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(query, { ...options, variables })
  }

  mutation<TResponse, TVariables = Record<string, unknown>>(
    mutation: string,
    variables?: TVariables,
    options?: Omit<IGraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(mutation, {
      ...options,
      variables,
    })
  }

  subscription<TResponse, TVariables = Record<string, unknown>>(
    subscription: string,
    variables?: TVariables,
    options?: Omit<IGraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(subscription, {
      ...options,
      variables,
    })
  }
}

export const graphqlClient = new GraphQLClient()
