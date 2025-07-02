import type { CoreRequestOptions } from '../core'

export interface GraphQLRequestOptions<TVariables = Record<string, unknown>>
  extends Omit<CoreRequestOptions, 'method'> {
  variables?: TVariables
  operationName?: string
}

export interface GraphQLRequest<TVariables = Record<string, unknown>> {
  query: string
  variables?: TVariables
  operationName?: string
}

export type { GraphQLResponse } from '../core'
