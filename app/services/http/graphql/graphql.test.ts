import { beforeEach, describe, expect, it, vi } from 'vitest'

import { graphqlClient } from './graphql'

vi.mock('../core', () => {
  return {
    resolveBaseUrl: vi.fn((baseUrl?: string) => {
      return baseUrl || 'http://localhost:3001/api'
    }),
    buildUrl: vi.fn((baseUrl: string, path: string) => {
      return `${baseUrl}/${path}`
    }),
    HTTP_CONFIG: {
      GRAPHQL_ENDPOINT: 'graphql',
    },
    HTTP_ADAPTER_CONFIG: {
      graphqlAdapter: vi.fn(() => {
        return {
          request: vi.fn(),
        }
      }),
    },
  }
})

describe('GraphQLClient', () => {
  let mockAdapter: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockAdapter = (
      graphqlClient as unknown as {
        adapter: { request: ReturnType<typeof vi.fn> }
      }
    ).adapter
  })

  describe('request method', () => {
    it('should call adapter request with correct parameters', async () => {
      const mockResponse = { data: { user: { id: 1, name: 'test' } } }
      mockAdapter.request.mockResolvedValue(mockResponse)

      const query = `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
          }
        }
      `
      const variables = { id: '1' }

      const result = await graphqlClient.request(query, {
        variables,
        operationName: 'GetUser',
        headers: { 'X-Test': 'value' },
        baseUrl: 'https://custom-api.com',
        timeout: 5000,
        tags: ['users'],
        revalidate: 300,
      })

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'https://custom-api.com/graphql',
        query,
        {
          variables,
          operationName: 'GetUser',
          headers: { 'X-Test': 'value' },
          baseUrl: 'https://custom-api.com',
          timeout: 5000,
          tags: ['users'],
          revalidate: 300,
        },
      )
      expect(result).toBe(mockResponse)
    })

    it('should use default parameters when not provided', async () => {
      const mockResponse = { data: { users: [] } }
      mockAdapter.request.mockResolvedValue(mockResponse)

      const query = 'query { users { id name } }'

      await graphqlClient.request(query)

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'http://localhost:3001/api/graphql',
        query,
        {
          variables: undefined,
          operationName: undefined,
          headers: undefined,
          baseUrl: undefined,
          timeout: undefined,
          tags: [],
          revalidate: undefined,
        },
      )
    })

    it('should handle adapter errors', async () => {
      const error = new Error('GraphQL error')
      mockAdapter.request.mockRejectedValue(error)

      const query = 'query { users { id } }'

      await expect(graphqlClient.request(query)).rejects.toThrow(
        'GraphQL error',
      )
    })
  })

  describe('GraphQL operation shortcuts', () => {
    beforeEach(() => {
      mockAdapter.request.mockResolvedValue({ data: { result: 'test' } })
    })

    describe('query', () => {
      it('should make query request with variables', async () => {
        const query = `
          query GetUsers($limit: Int!) {
            users(limit: $limit) {
              id
              name
            }
          }
        `
        const variables = { limit: 10 }

        await graphqlClient.query(query, variables, {
          headers: { 'X-Test': 'value' },
        })

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          query,
          {
            variables,
            operationName: undefined,
            headers: { 'X-Test': 'value' },
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })

      it('should make query request without variables', async () => {
        const query = 'query { users { id name } }'

        await graphqlClient.query(query)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          query,
          {
            variables: undefined,
            operationName: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('mutation', () => {
      it('should make mutation request with variables', async () => {
        const mutation = `
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              id
              name
              email
            }
          }
        `
        const variables = {
          input: {
            name: 'John Doe',
            email: 'john@example.com',
          },
        }

        await graphqlClient.mutation(mutation, variables)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          mutation,
          {
            variables,
            operationName: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })

      it('should make mutation request without variables', async () => {
        const mutation = `
          mutation DeleteAllUsers {
            deleteAllUsers {
              success
              count
            }
          }
        `

        await graphqlClient.mutation(mutation)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          mutation,
          {
            variables: undefined,
            operationName: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('subscription', () => {
      it('should make subscription request with variables', async () => {
        const subscription = `
          subscription UserUpdates($userId: ID!) {
            userUpdates(userId: $userId) {
              id
              name
              updatedAt
            }
          }
        `
        const variables = { userId: '123' }

        await graphqlClient.subscription(subscription, variables)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          subscription,
          {
            variables,
            operationName: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })

      it('should make subscription request without variables', async () => {
        const subscription = `
          subscription AllUserUpdates {
            allUserUpdates {
              id
              name
              updatedAt
            }
          }
        `

        await graphqlClient.subscription(subscription)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/graphql',
          subscription,
          {
            variables: undefined,
            operationName: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })
  })

  describe('TypeScript generics', () => {
    it('should properly type response data', async () => {
      interface User {
        id: string
        name: string
        email: string
      }

      interface GetUserResponse {
        user: User
      }

      const mockResponse: GetUserResponse = {
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
      mockAdapter.request.mockResolvedValue(mockResponse)

      const query =
        'query GetUser($id: ID!) { user(id: $id) { id name email } }'
      const result = await graphqlClient.query<GetUserResponse>(query, {
        id: '1',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should properly type variables', async () => {
      interface CreateUserVariables {
        input: {
          name: string
          email: string
        }
      }

      interface CreateUserResponse {
        createUser: {
          id: string
          name: string
          email: string
        }
      }

      const variables: CreateUserVariables = {
        input: {
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      }

      const mockResponse: CreateUserResponse = {
        createUser: {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      }
      mockAdapter.request.mockResolvedValue(mockResponse)

      const mutation = `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
            email
          }
        }
      `

      const result = await graphqlClient.mutation<
        CreateUserResponse,
        CreateUserVariables
      >(mutation, variables)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('endpoint construction', () => {
    it('should use default GraphQL endpoint', async () => {
      const query = 'query { users { id } }'
      mockAdapter.request.mockResolvedValue({ data: {} })

      await graphqlClient.query(query)

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'http://localhost:3001/api/graphql',
        query,
        expect.any(Object),
      )
    })

    it('should use custom base URL when provided', async () => {
      const query = 'query { users { id } }'
      mockAdapter.request.mockResolvedValue({ data: {} })

      await graphqlClient.query(query, undefined, {
        baseUrl: 'https://custom-graphql.com',
      })

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'https://custom-graphql.com/graphql',
        query,
        expect.any(Object),
      )
    })
  })
})
