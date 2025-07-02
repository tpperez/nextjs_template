export { HTTP_CONFIG, HTTP_ADAPTER_CONFIG } from './core'
export type { HttpConfig } from './core'

export type {
  HttpMethod,
  BaseRequestConfig,
  CacheConfig,
  HttpError,
  GraphQLError,
  GraphQLResponse,
  CoreRequestOptions,
} from './core.type'

export {
  resolveBaseUrl,
  createHeaders,
  processResponse,
  createTimeoutSignal,
  buildUrl,
} from './core.utils'

export type {
  RestHttpAdapter,
  GraphQLHttpAdapter,
  AdapterConfig,
  HttpRequestConfig,
  GraphQLRequestConfig,
  RestAdapterFactory,
  GraphQLAdapterFactory,
} from './core.type'
