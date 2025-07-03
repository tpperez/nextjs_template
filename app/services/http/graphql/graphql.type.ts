import type { ICoreRequestOptions } from '../core'

export interface IGraphQLRequestOptions<TVariables = Record<string, unknown>>
  extends Omit<ICoreRequestOptions, 'method'> {
  variables?: TVariables
  operationName?: string
}

export interface IGraphQLRequest<TVariables = Record<string, unknown>> {
  query: string
  variables?: TVariables
  operationName?: string
}

export type { IGraphQLResponse } from '../core'
