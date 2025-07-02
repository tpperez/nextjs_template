import {
  HTTP_CONFIG,
  HTTP_ADAPTER_CONFIG,
  resolveBaseUrl,
  buildUrl,
  type GraphQLHttpAdapter,
} from '../core'

import type { GraphQLRequestOptions, GraphQLResponse } from './graphql.type'

class GraphQLClient {
  private adapter: GraphQLHttpAdapter

  constructor() {
    const adapterFactory = HTTP_ADAPTER_CONFIG.graphqlAdapter
    this.adapter = adapterFactory()
  }

  async request<TResponse, TVariables = Record<string, unknown>>(
    query: string,
    options: GraphQLRequestOptions<TVariables> = {},
  ): Promise<GraphQLResponse<TResponse>> {
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
    options?: Omit<GraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(query, { ...options, variables })
  }

  mutation<TResponse, TVariables = Record<string, unknown>>(
    mutation: string,
    variables?: TVariables,
    options?: Omit<GraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(mutation, {
      ...options,
      variables,
    })
  }

  subscription<TResponse, TVariables = Record<string, unknown>>(
    subscription: string,
    variables?: TVariables,
    options?: Omit<GraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(subscription, {
      ...options,
      variables,
    })
  }
}

export const graphqlClient = new GraphQLClient()
