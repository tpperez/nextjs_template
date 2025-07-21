# Technology Stack

Comprehensive framework and library specifications covering technology selection rationale, version management, and architectural decisions.

## core framework architecture

### next.js application framework

next.js 15.3.5 provides the foundational application framework with advanced features:

```typescript
// next.config.mjs configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  // app router configuration
  experimental: {
    appDir: true,
    typedRoutes: true,
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic content
      static: 180, // 3 minutes for static content
    },
  },

  // performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: true,
  },

  // image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // bundle analysis integration
  ...(process.env.ANALYZE === 'true' && {
    '@next/bundle-analyzer': {
      enabled: true,
    },
  }),
}

export default nextConfig
```

**selection rationale:**

- server-side rendering for optimal seo and performance
- app router for modern routing patterns
- built-in optimization for images, fonts, and scripts
- excellent typescript integration
- strong ecosystem and community support

### react 19.1.0 foundation

react 19 introduces concurrent features and improved developer experience:

```typescript
// app/layout.tsx - root layout configuration
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6'
}

export const metadata: Metadata = {
  title: {
    template: '%s | pokemon app',
    default: 'pokemon app'
  },
  description: 'modern react application with next.js and typescript',
  keywords: ['react', 'next.js', 'typescript', 'pokemon', 'demo']
}

interface IRootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

export default RootLayout
```

**key features utilized:**

- concurrent features for better user experience
- automatic batching for performance optimization
- improved strict mode for development
- enhanced typescript integration

### typescript 5.x integration

typescript provides comprehensive type safety and developer tooling:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**benefits:**

- compile-time error detection
- enhanced ide support with autocomplete
- refactoring safety with type checking
- better documentation through type definitions

### node.js runtime environment

node.js 20.x provides the runtime foundation:

```bash
# .nvmrc specification
20.11.1

# package.json engines specification
{
  "engines": {
    "node": ">=18.17.0 <23.0.0",
    "npm": ">=9.0.0"
  }
}
```

**version management strategy:**

- nvm for consistent development environments
- engine specifications prevent incompatible versions
- lts versions prioritized for stability
- security updates applied promptly

## styling and design system

### tailwind css 4.1.4 framework

tailwind provides utility-first css with modern features:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
```

**key advantages:**

- rapid prototyping and development
- consistent design system
- optimized build output with unused css removal
- excellent responsive design capabilities

### postcss processing pipeline

postcss configuration for css processing:

```javascript
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
```

### utility libraries for styling

enhanced styling capabilities with utility libraries:

```typescript
// clsx and tailwind-merge integration
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// usage example
const buttonStyles = cn(
  'px-4 py-2 rounded-md font-medium',
  'bg-blue-600 hover:bg-blue-700',
  'text-white',
  disabled && 'opacity-50 cursor-not-allowed',
  className,
)
```

## data management architecture

### tanstack query 5.62.8 for server state

react query handles server state management with advanced caching:

```typescript
// providers/query-client.provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

interface IQueryProviderProps {
  children: React.ReactNode
}

const QueryProvider: React.FC<IQueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000,   // 10 minutes
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (error?.status === 404) return false
              return failureCount < 3
            }
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
```

**features utilized:**

- intelligent caching with stale-while-revalidate
- background refetching for fresh data
- optimistic updates for better ux
- error handling with retry logic
- devtools integration for debugging

### zustand 5.0.5 for client state

lightweight state management for application state:

```typescript
// stores/example.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface IExampleState {
  items: string[]
  loading: boolean
  error: string | null
}

interface IExampleActions {
  addItem: (item: string) => void
  removeItem: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type TExampleStore = IExampleState & IExampleActions

export const useExampleStore = create<TExampleStore>()(
  persist(
    immer((set) => ({
      // state
      items: [],
      loading: false,
      error: null,

      // actions
      addItem: (item) =>
        set((state) => {
          state.items.push(item)
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((item) => item !== id)
        }),

      setLoading: (loading) =>
        set((state) => {
          state.loading = loading
        }),

      setError: (error) =>
        set((state) => {
          state.error = error
        }),
    })),
    {
      name: 'example-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
```

**selection rationale:**

- minimal boilerplate compared to redux
- typescript-first design
- middleware support for persistence and devtools
- excellent performance characteristics

### http client architecture

flexible http clients for api integration:

```typescript
// services/http/adapters/axios.adapter.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type {
  IRestHttpAdapter,
  IHttpRequestConfig,
  IHttpError,
} from '../core/core.type'

export class AxiosAdapter implements IRestHttpAdapter {
  private client: AxiosInstance
  readonly name = 'axios-adapter'

  constructor(config: AxiosRequestConfig = {}) {
    this.client = axios.create({
      timeout: 10000,
      ...config,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const httpError: IHttpError = {
          message: error.message,
          status: error.response?.status || 0,
          code: error.code,
          details: error.response?.data,
        }
        return Promise.reject(httpError)
      },
    )
  }

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.request({
      url,
      method: config.method,
      data: config.body,
      headers: config.headers,
      timeout: config.timeout,
      signal: config.signal,
    })

    return response.data
  }
}

export const axiosAdapter = new AxiosAdapter()
```

## form management system

### react hook form 7.59.0 integration

performant form handling with minimal re-renders:

```typescript
// hooks/use-form-with-schema.ts
import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodSchema } from 'zod'

export const useFormWithSchema = <T extends ZodSchema>(
  schema: T,
  options?: UseFormProps<z.infer<T>>
) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    ...options
  })
}

// usage example
const loginSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(8, 'password too short')
})

const LoginForm = () => {
  const form = useFormWithSchema(loginSchema, {
    defaultValues: { email: '', password: '' }
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  )
}
```

### zod 4.0.5 validation schema

runtime type validation and parsing:

```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'name is required').max(100),
  email: z.string().email('invalid email format'),
  age: z.number().int().min(13).max(120).optional(),
  preferences: z
    .object({
      theme: z.enum(['light', 'dark', 'system']),
      notifications: z.boolean().default(true),
      language: z.string().length(2).default('en'),
    })
    .optional(),
})

export type TUserProfile = z.infer<typeof userProfileSchema>

// validation utilities
export const validateUserProfile = (data: unknown): TUserProfile => {
  return userProfileSchema.parse(data)
}

export const safeValidateUserProfile = (data: unknown) => {
  return userProfileSchema.safeParse(data)
}
```

## testing framework ecosystem

### vitest 3.2.4 test runner

modern testing framework with native typescript support:

```typescript
// vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },
})
```

### testing library suite

comprehensive testing utilities for react components:

```typescript
// test/utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'

interface ICustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

const createTestWrapper = (queryClient?: QueryClient) => {
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export const renderWithProviders = (
  ui: ReactElement,
  options: ICustomRenderOptions = {}
) => {
  const { queryClient, ...renderOptions } = options
  const Wrapper = createTestWrapper(queryClient)

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
```

## code quality assurance

### eslint 9.21.0 configuration

comprehensive linting with multiple rule sets:

```javascript
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettier,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
```

### prettier 3.5.2 formatting

consistent code formatting with tailwind integration:

```javascript
// prettier.config.mjs
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
}
```

### automation and git integration

quality assurance automation with git hooks:

```javascript
// .lintstagedrc.mjs
import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --no-cache --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    buildEslintCommand,
    'vitest related --run',
  ],
  '*.{md,json,yml,yaml}': ['prettier --write'],
}
```

## build and development tools

### swc compilation

fast typescript and javascript compilation:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}
```

### bundle analysis

webpack bundle analyzer for optimization:

```typescript
// next.config.mjs bundle analyzer integration
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

### performance monitoring

core web vitals and performance metrics:

```typescript
// app/lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed() {
  return 'connection' in navigator &&
    'effectiveType' in (navigator as any).connection
    ? (navigator as any).connection.effectiveType
    : ''
}

function sendToAnalytics(metric: any) {
  const body = JSON.stringify({
    dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body)
  } else {
    fetch(vitalsUrl, { body, method: 'POST', keepalive: true })
  }
}

export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

## deployment and infrastructure

### production optimization

build configuration for production deployment:

```javascript
// next.config.mjs production optimizations
const nextConfig = {
  output: 'standalone',

  // compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'deny',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}
```

This comprehensive technology stack documentation provides detailed insights into each technology choice, configuration patterns, and integration strategies used throughout the application. The stack emphasizes modern development practices, type safety, performance optimization, and maintainability.
