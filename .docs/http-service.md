# HTTP Service Guide

> 🔧 **Complete technical documentation for REST and GraphQL clients.** Learn how to use the HTTP service implementation with adapters, configuration, and advanced features.

---

## 📋 Table of Contents

- [🔧 HTTP Service Overview](#-http-service-overview)
- [⚡ Quick Start Guide](#-quick-start-guide)
- [🌐 REST Client Usage](#-rest-client-usage)
  - [✅ Basic Operations](#-basic-operations)
  - [🎯 Advanced Configuration](#-advanced-configuration)
- [📊 GraphQL Client Usage](#-graphql-client-usage)
  - [✅ Queries & Mutations](#-queries--mutations)
  - [🎯 Advanced Features](#-advanced-features)
- [🎛️ Configuration & Setup](#️-configuration--setup)
  - [🔧 HTTP_CONFIG](#-http_config)
  - [🎛️ HttpProvider Setup](#️-httpprovider-setup)
- [🔀 Adapters System](#-adapters-system)
  - [🌐 REST Adapters](#-rest-adapters)
  - [📊 GraphQL Adapters](#-graphql-adapters)
- [⚡ Advanced Features](#-advanced-features)
  - [🏷️ Cache Integration](#️-cache-integration)
  - [⏱️ Timeout & Cancellation](#️-timeout--cancellation)
  - [🛡️ Error Handling](#️-error-handling)
- [🔧 Troubleshooting](#-troubleshooting)
- [📚 API Reference](#-api-reference)

---

## 🔧 HTTP Service Overview

### 🏗️ Architecture

The HTTP service is located at `app/services/http/` and provides a **robust, flexible HTTP client system** with adapter-based architecture for both REST and GraphQL operations.

```
services/http/
├── core/                         # 🎯 Central configuration
│   ├── core.ts                   # HTTP_CONFIG and adapter factories
│   ├── core.type.ts              # Shared interfaces and types
│   ├── core.utils.ts             # Request utilities
│   └── index.ts                  # Core exports
├── rest/                         # 🌐 REST client
│   ├── adapters/
│   │   ├── fetch-rest.ts         # Native fetch adapter (default)
│   │   ├── axios-rest.ts         # Axios adapter (optional)
│   │   └── index.ts
│   ├── rest.ts                   # Main REST client
│   ├── rest.type.ts              # REST-specific types
│   └── index.ts
├── graphql/                      # 📊 GraphQL client
│   ├── adapters/
│   │   ├── fetch-graphql.ts      # Native fetch GraphQL adapter (default)
│   │   ├── graphql-request.ts    # graphql-request adapter (optional)
│   │   └── index.ts
│   ├── graphql.ts                # Main GraphQL client
│   ├── graphql.type.ts           # GraphQL-specific types
│   └── index.ts
├── providers/                    # 🎛️ React integration
│   ├── react-query.tsx           # HttpProvider component
│   └── index.ts
└── index.ts                      # Main entry point
```

### 🎯 Key Features

- ✅ **Unified interface** for REST and GraphQL
- ✅ **Adapter system** - swap implementations easily
- ✅ **Next.js integration** - native caching and revalidation
- ✅ **React Query ready** - optimized for client-side data fetching
- ✅ **TypeScript first** - full type safety
- ✅ **Error handling** - consistent error patterns

---

## ⚡ Quick Start Guide

### 🚀 Installation

The HTTP service is already configured. Dependencies:

```json
{
  "@tanstack/react-query": "^5.62.8",
  "axios": "^1.10.0",
  "graphql-request": "^6.1.0"
}
```

### 🎛️ Setup HttpProvider

```tsx
// app/layout.tsx
import { HttpProvider } from './services/http'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HttpProvider>{children}</HttpProvider>
      </body>
    </html>
  )
}
```

### 📝 Environment Configuration

```env
# .env.local
NEXT_PUBLIC_API_URL="https://api.example.com/v1"
```

### 🔧 Basic Usage

```tsx
// Import clients
import { restClient, graphqlClient } from '@/app/services/http'

// REST example
const users = await restClient.get('/users')

// GraphQL example
const { data } = await graphqlClient.query(
  `
  query GetUser($id: ID!) {
    user(id: $id) { id name email }
  }
`,
  { id: '123' },
)
```

---

## 🌐 REST Client Usage

### ✅ Basic Operations

#### **GET Requests**

```tsx
import { restClient } from '@/app/services/http'

// Simple GET
const users = await restClient.get('/users')

// GET with query parameters
const filteredUsers = await restClient.get('/users', {
  headers: {
    'X-Filter': 'active',
    'X-Sort': 'name',
  },
})

// GET with full configuration
const products = await restClient.get('/products', {
  baseUrl: 'https://api.store.com',
  timeout: 10000,
  tags: ['products'],
  revalidate: 3600, // 1 hour cache
})
```

#### **POST Requests**

```tsx
// Create user
const newUser = await restClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
})

// POST with custom headers
const createPost = await restClient.post('/posts', postData, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token',
  },
  timeout: 5000,
})
```

#### **PUT/PATCH Requests**

```tsx
// Full update (PUT)
const updatedUser = await restClient.put('/users/123', {
  name: 'John Updated',
  email: 'john.updated@example.com',
})

// Partial update (PATCH)
const patchedUser = await restClient.patch('/users/123', {
  name: 'New Name Only',
})
```

#### **DELETE Requests**

```tsx
// Delete resource
await restClient.delete('/users/123')

// Delete with confirmation
await restClient.delete('/users/123', {
  headers: {
    'X-Confirm': 'true',
  },
})
```

### 🎯 Advanced Configuration

#### **Custom Base URLs**

```tsx
// Different API endpoints
const authData = await restClient.get('/login', {
  baseUrl: 'https://auth.example.com',
})

const paymentData = await restClient.get('/charges', {
  baseUrl: 'https://payments.example.com',
})
```

#### **Cache Configuration**

```tsx
// Short cache for dynamic data
const liveData = await restClient.get('/live-data', {
  revalidate: 60, // 1 minute
})

// Long cache for static data
const staticContent = await restClient.get('/content', {
  revalidate: 86400, // 24 hours
})

// No cache for personalized data
const userProfile = await restClient.get('/profile', {
  revalidate: false,
})
```

#### **Cache Tags for Invalidation**

```tsx
// Tag-based cache management
const product = await restClient.get(`/products/${id}`, {
  tags: [`product-${id}`, 'products', 'catalog'],
})

// Invalidate after mutation
import { revalidateTag } from 'next/cache'

await restClient.post('/products', newProduct)
revalidateTag('products')
revalidateTag('catalog')
```

---

## 📊 GraphQL Client Usage

### ✅ Queries & Mutations

#### **Basic Queries**

```tsx
import { graphqlClient } from '@/app/services/http'

// Simple query
const GET_USERS = `
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

const { data } = await graphqlClient.query(GET_USERS)
console.log(data.users)
```

#### **Queries with Variables**

```tsx
const GET_USER_WITH_POSTS = `
  query GetUserWithPosts($userId: ID!, $postLimit: Int = 10) {
    user(id: $userId) {
      id
      name
      email
      posts(limit: $postLimit) {
        id
        title
        content
        createdAt
      }
    }
  }
`

const { data } = await graphqlClient.query(GET_USER_WITH_POSTS, {
  userId: '123',
  postLimit: 5,
})
```

#### **Mutations**

```tsx
const CREATE_POST = `
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      content
      user {
        id
        name
      }
    }
  }
`

const { data } = await graphqlClient.mutation(CREATE_POST, {
  input: {
    title: 'New Post',
    content: 'Post content here...',
    userId: '123',
  },
})
```

#### **Subscriptions**

```tsx
const SUBSCRIBE_TO_POSTS = `
  subscription SubscribeToPosts($userId: ID!) {
    postUpdates(userId: $userId) {
      id
      title
      action
    }
  }
`

const subscription = await graphqlClient.subscription(SUBSCRIBE_TO_POSTS, {
  userId: '123',
})
```

### 🎯 Advanced Features

#### **Custom GraphQL Endpoint**

```tsx
// Use different GraphQL endpoint
const { data } = await graphqlClient.query(COMPLEX_QUERY, variables, {
  baseUrl: 'https://graphql.api.com',
})
```

#### **Operation Names**

```tsx
const { data } = await graphqlClient.query(
  GET_USER_QUERY,
  { id: '123' },
  {
    operationName: 'GetUserProfile',
    tags: ['user-123'],
    revalidate: 300,
  },
)
```

#### **Error Handling**

```tsx
try {
  const { data, errors } = await graphqlClient.query(QUERY, variables)

  if (errors?.length) {
    console.warn('GraphQL errors:', errors)
  }

  return data
} catch (error) {
  console.error('Network error:', error)
  throw error
}
```

---

## 🎛️ Configuration & Setup

### 🔧 HTTP_CONFIG

```tsx
// app/services/http/core/core.ts
export const HTTP_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  GRAPHQL_ENDPOINT: '/graphql',
  DEFAULT_REVALIDATE: 300, // 5 minutes
  DEFAULT_STALE_TIME: 5 * 60 * 1000, // 5 minutes
  DEFAULT_RETRY_COUNT: 1,
  DEFAULT_TIMEOUT: 10000, // 10 seconds
}
```

#### **Configuration Options**

| Option                | Description            | Default              | Example                   |
| --------------------- | ---------------------- | -------------------- | ------------------------- |
| `BASE_URL`            | API base URL           | `localhost:3001/api` | `https://api.example.com` |
| `GRAPHQL_ENDPOINT`    | GraphQL path           | `/graphql`           | `/api/graphql`            |
| `DEFAULT_REVALIDATE`  | Cache TTL (seconds)    | `300`                | `3600`                    |
| `DEFAULT_STALE_TIME`  | React Query stale time | `5 * 60 * 1000`      | `10 * 60 * 1000`          |
| `DEFAULT_RETRY_COUNT` | Retry attempts         | `1`                  | `3`                       |
| `DEFAULT_TIMEOUT`     | Request timeout        | `10000`              | `30000`                   |

#### **Environment-based Configuration**

```tsx
// Different configs per environment
const getEnvironmentConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      ...HTTP_CONFIG,
      DEFAULT_TIMEOUT: 5000,
      DEFAULT_RETRY_COUNT: 3,
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      ...HTTP_CONFIG,
      DEFAULT_TIMEOUT: 30000,
      DEFAULT_RETRY_COUNT: 1,
    }
  }

  return HTTP_CONFIG
}
```

### 🎛️ HttpProvider Setup

```tsx
// app/services/http/providers/react-query.tsx
export const HttpProvider = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: HTTP_CONFIG.DEFAULT_STALE_TIME,
          retry: HTTP_CONFIG.DEFAULT_RETRY_COUNT,
          refetchOnWindowFocus: false,
          refetchOnReconnect: 'always',
        },
        mutations: {
          retry: false,
        },
      },
    })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

#### **Custom Provider Configuration**

```tsx
// Custom HttpProvider with dev tools
export const HttpProviderWithDevtools = ({
  children,
  showDevtools = false,
}) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: HTTP_CONFIG.DEFAULT_STALE_TIME,
          retry: HTTP_CONFIG.DEFAULT_RETRY_COUNT,
          refetchOnWindowFocus: false,
        },
      },
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
```

---

## 🔀 Adapters System

### 🌐 REST Adapters

#### **FetchRestAdapter (Default)**

```tsx
// Uses native fetch with Next.js features
export class FetchRestAdapter implements RestHttpAdapter {
  readonly name = 'fetch-rest'

  async request<TResponse>(
    url: string,
    config: HttpRequestConfig,
  ): Promise<TResponse> {
    // Implementation with fetch + Next.js cache
  }
}
```

**Benefits:**

- ✅ Native Next.js cache integration
- ✅ No additional dependencies
- ✅ Built-in timeout and signal support
- ✅ Optimized for server-side rendering

#### **AxiosRestAdapter (Optional)**

```tsx
// Uses Axios library
export class AxiosRestAdapter implements RestHttpAdapter {
  readonly name = 'axios-rest'

  async request<TResponse>(
    url: string,
    config: HttpRequestConfig,
  ): Promise<TResponse> {
    // Implementation with Axios + interceptors
  }
}
```

**Benefits:**

- ✅ Rich interceptor system
- ✅ Automatic request/response transformations
- ✅ Built-in upload progress
- ✅ Wide browser compatibility

#### **Switching REST Adapters**

```tsx
// app/services/http/core/core.ts
import { AxiosRestAdapter } from '../rest/adapters'

export const HTTP_ADAPTER_CONFIG = {
  restAdapter: () => new AxiosRestAdapter(), // Switch to Axios
  graphqlAdapter: () => new FetchGraphQLAdapter(),
}
```

### 📊 GraphQL Adapters

#### **FetchGraphQLAdapter (Default)**

```tsx
// Uses native fetch for GraphQL
export class FetchGraphQLAdapter implements GraphQLHttpAdapter {
  readonly name = 'fetch-graphql'

  async request<TResponse>(
    endpoint: string,
    query: string,
    config: GraphQLRequestConfig,
  ): Promise<GraphQLResponse<TResponse>> {
    // Implementation with fetch + Next.js features
  }
}
```

**Benefits:**

- ✅ Next.js cache integration
- ✅ No additional dependencies
- ✅ Server-side rendering optimized

#### **GraphQLRequestAdapter (Optional)**

```tsx
// Uses graphql-request library
export class GraphQLRequestAdapter implements GraphQLHttpAdapter {
  readonly name = 'graphql-request'

  async request<TResponse>(
    endpoint: string,
    query: string,
    config: GraphQLRequestConfig,
  ): Promise<GraphQLResponse<TResponse>> {
    // Implementation with graphql-request features
  }
}
```

**Benefits:**

- ✅ Rich GraphQL-specific features
- ✅ Built-in request/response middleware
- ✅ File upload support
- ✅ Subscription support

#### **Switching GraphQL Adapters**

```tsx
// app/services/http/core/core.ts
import { GraphQLRequestAdapter } from '../graphql/adapters'

export const HTTP_ADAPTER_CONFIG = {
  restAdapter: () => new FetchRestAdapter(),
  graphqlAdapter: () => new GraphQLRequestAdapter(), // Switch to graphql-request
}
```

---

## ⚡ Advanced Features

### 🏷️ Cache Integration

#### **Next.js Cache Tags**

```tsx
// Server-side caching with tags
const product = await restClient.get(`/products/${id}`, {
  tags: [`product-${id}`, 'products'],
  revalidate: 3600, // 1 hour
})

// Invalidate specific tags
import { revalidateTag } from 'next/cache'

// After product update
await restClient.put(`/products/${id}`, updatedData)
revalidateTag(`product-${id}`)
revalidateTag('products')
```

#### **React Query Integration**

```tsx
// Client-side with React Query
import { useQuery } from '@tanstack/react-query'

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => restClient.get('/products'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />

  return <ProductGrid products={data} />
}
```

### ⏱️ Timeout & Cancellation

#### **Custom Timeouts**

```tsx
// Short timeout for critical operations
const criticalData = await restClient.get('/critical-endpoint', {
  timeout: 3000, // 3 seconds
})

// Long timeout for heavy operations
const reportData = await restClient.get('/generate-report', {
  timeout: 60000, // 1 minute
})
```

#### **Request Cancellation**

```tsx
// Manual cancellation
const controller = new AbortController()

const request = restClient.get('/slow-endpoint', {
  signal: controller.signal,
})

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000)

try {
  const data = await request
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled')
  }
}
```

#### **Component-level Cancellation**

```tsx
import { useEffect, useState } from 'react'

function DataComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const result = await restClient.get('/data', {
          signal: controller.signal,
        })
        setData(result)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch failed:', error)
        }
      }
    }

    fetchData()

    return () => controller.abort() // Cleanup on unmount
  }, [])

  return data ? <DataDisplay data={data} /> : <Loading />
}
```

### 🛡️ Error Handling

#### **HTTP Error Structure**

```tsx
interface HttpError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}
```

#### **Error Handling Patterns**

```tsx
// Try-catch with specific error handling
try {
  const data = await restClient.get('/api/data')
  return data
} catch (error: any) {
  if (error.status === 401) {
    // Redirect to login
    redirect('/login')
  } else if (error.status === 403) {
    // Show permission error
    throw new Error('Permission denied')
  } else if (error.status >= 500) {
    // Server error - show generic message
    throw new Error('Server error. Please try again later.')
  } else {
    // Client error - show specific message
    throw new Error(error.message || 'Request failed')
  }
}
```

#### **GraphQL Error Handling**

```tsx
try {
  const { data, errors } = await graphqlClient.query(QUERY, variables)

  // Handle GraphQL errors
  if (errors?.length) {
    const errorMessages = errors.map((err) => err.message).join(', ')
    throw new Error(`GraphQL errors: ${errorMessages}`)
  }

  return data
} catch (error) {
  // Handle network errors
  console.error('Request failed:', error)
  throw error
}
```

#### **Global Error Handling**

```tsx
// Error boundary for HTTP errors
export function HttpErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={({ error }) => <ErrorPage error={error} />}
      onError={(error) => {
        // Log to monitoring service
        console.error('HTTP Error:', error)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

---

## 🔧 Troubleshooting

### 🐛 Common Issues

#### **CORS Errors**

```tsx
// Issue: CORS errors in development
// Solution: Configure your API server to allow your development domain

// Next.js config for development proxy
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ]
  },
}
```

#### **TypeScript Errors**

```tsx
// Issue: Type errors with response data
// Solution: Define proper interfaces

interface User {
  id: string
  name: string
  email: string
}

// Type the response
const users = await restClient.get<User[]>('/users')
```

#### **Cache Issues**

```tsx
// Issue: Stale data in cache
// Solution: Use proper cache invalidation

// Invalidate after mutations
await restClient.post('/users', newUser)
revalidateTag('users')

// Or use shorter cache times for dynamic data
const liveData = await restClient.get('/live-data', {
  revalidate: 30, // 30 seconds
})
```

### 🔍 Debug Mode

```tsx
// Enable debug logging
const debugData = await restClient.get('/data', {
  headers: {
    'X-Debug': 'true',
  },
})

// Or add console logging
console.log('Making request to:', '/api/data')
const data = await restClient.get('/data')
console.log('Response received:', data)
```

### 📊 Performance Issues

#### **Too Many Requests**

```tsx
// Issue: Multiple identical requests
// Solution: Use React Query deduplication

import { useQuery } from '@tanstack/react-query'

function MultipleComponents() {
  // All components using same query key will share the request
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => restClient.get('/users'),
  })
}
```

#### **Large Responses**

```tsx
// Issue: Large response data causing performance issues
// Solution: Use pagination or streaming

// Pagination
const pageData = await restClient.get('/data', {
  headers: {
    'X-Page': '1',
    'X-Limit': '20',
  },
})

// Or use GraphQL to request only needed fields
const MINIMAL_USER_QUERY = `
  query GetUsers {
    users {
      id
      name
      # Don't fetch heavy fields like avatar, bio, etc.
    }
  }
`
```

---

## 📚 API Reference

### 🌐 RestClient

```tsx
interface RestClient {
  get<T>(path: string, options?: RestRequestOptions): Promise<T>
  post<T, B>(
    path: string,
    body?: B,
    options?: RestRequestOptions<B>,
  ): Promise<T>
  put<T, B>(path: string, body?: B, options?: RestRequestOptions<B>): Promise<T>
  patch<T, B>(
    path: string,
    body?: B,
    options?: RestRequestOptions<B>,
  ): Promise<T>
  delete<T>(path: string, options?: RestRequestOptions): Promise<T>
  request<T, B>(path: string, options?: RestRequestOptions<B>): Promise<T>
}
```

#### **RestRequestOptions**

```tsx
interface RestRequestOptions<TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  headers?: HeadersInit
  baseUrl?: string
  timeout?: number
  tags?: string[]
  revalidate?: number | false
  signal?: AbortSignal
}
```

### 📊 GraphQLClient

```tsx
interface GraphQLClient {
  query<T, V = Record<string, unknown>>(
    query: string,
    variables?: V,
    options?: GraphQLRequestOptions<V>,
  ): Promise<GraphQLResponse<T>>

  mutation<T, V = Record<string, unknown>>(
    mutation: string,
    variables?: V,
    options?: GraphQLRequestOptions<V>,
  ): Promise<GraphQLResponse<T>>

  subscription<T, V = Record<string, unknown>>(
    subscription: string,
    variables?: V,
    options?: GraphQLRequestOptions<V>,
  ): Promise<GraphQLResponse<T>>

  request<T, V = Record<string, unknown>>(
    query: string,
    options?: GraphQLRequestOptions<V>,
  ): Promise<GraphQLResponse<T>>
}
```

#### **GraphQLRequestOptions**

```tsx
interface GraphQLRequestOptions<TVariables = Record<string, unknown>> {
  variables?: TVariables
  operationName?: string
  headers?: HeadersInit
  baseUrl?: string
  timeout?: number
  tags?: string[]
  revalidate?: number | false
  signal?: AbortSignal
}
```

#### **GraphQLResponse**

```tsx
interface GraphQLResponse<TData> {
  data?: TData
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: (string | number)[]
  extensions?: Record<string, unknown>
}
```

### 🎛️ Configuration Types

```tsx
interface HttpConfig {
  BASE_URL: string
  GRAPHQL_ENDPOINT: string
  DEFAULT_REVALIDATE: number
  DEFAULT_STALE_TIME: number
  DEFAULT_RETRY_COUNT: number
  DEFAULT_TIMEOUT: number
}

interface AdapterConfig {
  restAdapter: RestAdapterFactory
  graphqlAdapter: GraphQLAdapterFactory
}

type RestAdapterFactory = () => RestHttpAdapter
type GraphQLAdapterFactory = () => GraphQLHttpAdapter
```

---

### Related Documentation

- 📊 **[Data Fetching Strategy](./data-fetching-strategy.md)** - WHEN and WHY to use server vs client data fetching
- 📁 **[Project Organization](./project-organization.md)** - WHERE to organize files and folders
- 📝 **[Code Standards](./code-standards.md)** - HOW to write code, naming patterns, quality standards
- 📚 **[README](../README.md)** - Project setup and overview
