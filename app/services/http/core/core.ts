import { FetchGraphQLAdapter } from '../graphql/adapters'
import { FetchRestAdapter } from '../rest/adapters'
import { GraphQLAdapterFactory, RestAdapterFactory } from './core.type'

export const HTTP_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  GRAPHQL_ENDPOINT: '/graphql',
  DEFAULT_REVALIDATE: 300,
  DEFAULT_STALE_TIME: 5 * 60 * 1000,
  DEFAULT_RETRY_COUNT: 1,
  DEFAULT_TIMEOUT: 10000,
}

export type HttpConfig = typeof HTTP_CONFIG

export const HTTP_ADAPTER_CONFIG: {
  restAdapter: RestAdapterFactory
  graphqlAdapter: GraphQLAdapterFactory
} = {
  restAdapter: () => {
    return new FetchRestAdapter()
  },
  graphqlAdapter: () => {
    return new FetchGraphQLAdapter()
  },
}
