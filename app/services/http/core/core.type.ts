/**
 * HTTP methods supported by the clients
 */
export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Base configuration for HTTP requests
 */
export interface IBaseRequestConfig {
  baseUrl?: string
  headers?: HeadersInit
  timeout?: number
}

/**
 * Cache configuration for Next.js requests
 */
export interface ICacheConfig {
  tags?: string[]
  revalidate?: number | false
}

/**
 * Standard error response structure
 */
export interface IHttpError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

/**
 * GraphQL specific types
 */
export interface IGraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: (string | number)[]
  extensions?: Record<string, unknown>
}

export interface IGraphQLResponse<TData> {
  data?: TData
  errors?: IGraphQLError[]
}

/**
 * Generic request options that can be extended by specific clients
 */
export interface ICoreRequestOptions extends IBaseRequestConfig, ICacheConfig {
  method?: THttpMethod
}

/**
 * Base adapter configuration
 */
export interface IAdapterConfig extends IBaseRequestConfig {
  timeout?: number
}

/**
 * HTTP request configuration for adapters
 */
export interface IHttpRequestConfig extends IAdapterConfig, ICacheConfig {
  method: THttpMethod
  body?: unknown
  signal?: AbortSignal
}

/**
 * REST HTTP Adapter Interface
 * Defines the contract that any REST implementation must follow
 */
export interface IRestHttpAdapter {
  request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse>

  readonly name: string
}

/**
 * GraphQL request configuration for adapters
 */
export interface IGraphQLRequestConfig extends IAdapterConfig, ICacheConfig {
  variables?: Record<string, unknown>
  operationName?: string
  signal?: AbortSignal
}

/**
 * GraphQL HTTP Adapter Interface
 * Defines the contract that any GraphQL implementation must follow
 */
export interface IGraphQLHttpAdapter {
  request<TResponse>(
    endpoint: string,
    query: string,
    config: IGraphQLRequestConfig,
  ): Promise<IGraphQLResponse<TResponse>>

  readonly name: string
}

/**
 * Adapter factory type for dependency injection
 */
export type TRestAdapterFactory = () => IRestHttpAdapter
export type TGraphQLAdapterFactory = () => IGraphQLHttpAdapter
