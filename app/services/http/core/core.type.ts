/**
 * HTTP methods supported by the clients
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Base configuration for HTTP requests
 */
export interface BaseRequestConfig {
  baseUrl?: string
  headers?: HeadersInit
  timeout?: number
}

/**
 * Cache configuration for Next.js requests
 */
export interface CacheConfig {
  tags?: string[]
  revalidate?: number | false
}

/**
 * Standard error response structure
 */
export interface HttpError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

/**
 * GraphQL specific types
 */
export interface GraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: (string | number)[]
  extensions?: Record<string, unknown>
}

export interface GraphQLResponse<TData> {
  data?: TData
  errors?: GraphQLError[]
}

/**
 * Generic request options that can be extended by specific clients
 */
export interface CoreRequestOptions extends BaseRequestConfig, CacheConfig {
  method?: HttpMethod
}

/**
 * Base adapter configuration
 */
export interface AdapterConfig extends BaseRequestConfig {
  timeout?: number
}

/**
 * HTTP request configuration for adapters
 */
export interface HttpRequestConfig extends AdapterConfig, CacheConfig {
  method: HttpMethod
  body?: unknown
  signal?: AbortSignal
}

/**
 * REST HTTP Adapter Interface
 * Defines the contract that any REST implementation must follow
 */
export interface RestHttpAdapter {
  request<TResponse>(url: string, config: HttpRequestConfig): Promise<TResponse>

  readonly name: string
}

/**
 * GraphQL request configuration for adapters
 */
export interface GraphQLRequestConfig extends AdapterConfig, CacheConfig {
  variables?: Record<string, unknown>
  operationName?: string
  signal?: AbortSignal
}

/**
 * GraphQL HTTP Adapter Interface
 * Defines the contract that any GraphQL implementation must follow
 */
export interface GraphQLHttpAdapter {
  request<TResponse>(
    endpoint: string,
    query: string,
    config: GraphQLRequestConfig,
  ): Promise<GraphQLResponse<TResponse>>

  readonly name: string
}

/**
 * Adapter factory type for dependency injection
 */
export type RestAdapterFactory = () => RestHttpAdapter
export type GraphQLAdapterFactory = () => GraphQLHttpAdapter
