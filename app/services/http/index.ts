export type {
  IBaseRequestConfig,
  ICacheConfig,
  IGraphQLError,
  IHttpError,
  THttpMethod,
} from './core/core.type'
export type {
  IGraphQLRequest,
  IGraphQLRequestOptions,
  IGraphQLResponse,
} from './graphql'
export { graphqlClient } from './graphql'
export { HttpProvider } from './providers'
export type { IRestRequestOptions, TRestResponse } from './rest'
export { restClient } from './rest'
