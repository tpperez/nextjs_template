# Implementation Examples

Comprehensive code samples, usage patterns, integration examples, and template demonstrations for effective development practices.

## component patterns

### basic ui component

spinner component with typescript and tailwind integration:

```typescript
// app/components/ui/spinner/spinner.type.ts
export interface ISpinnerProps {
  size?: TSpinnerSize
  color?: TSpinnerColor
  text?: string
  className?: string
}

export type TSpinnerSize = 'sm' | 'md' | 'lg'
export type TSpinnerColor = 'blue' | 'gray' | 'green' | 'purple' | 'red'

// app/components/ui/spinner/spinner.const.ts
import type { TSpinnerColor, TSpinnerSize } from './spinner.type'

export const SPINNER_SIZE_CLASSES: Record<TSpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

export const SPINNER_COLOR_CLASSES: Record<TSpinnerColor, string> = {
  blue: 'border-blue-400',
  gray: 'border-gray-400',
  green: 'border-green-400',
  purple: 'border-purple-400',
  red: 'border-red-400'
}

// app/components/ui/spinner/spinner.tsx
import { clsx } from 'clsx'
import type { ISpinnerProps } from './spinner.type'
import { SPINNER_COLOR_CLASSES, SPINNER_SIZE_CLASSES } from './spinner.const'

const Spinner: React.FC<ISpinnerProps> = ({
  size = 'md',
  color = 'blue',
  text,
  className
}) => {
  const spinnerClasses = clsx(
    'animate-spin rounded-full border-2 border-t-transparent',
    SPINNER_SIZE_CLASSES[size],
    SPINNER_COLOR_CLASSES[color],
    className
  )

  return (
    <div className="flex items-center gap-2">
      <div
        className={spinnerClasses}
        role="status"
        aria-label="loading"
      />
      {text && (
        <span className="text-sm text-gray-600">{text}</span>
      )}
    </div>
  )
}

export default Spinner

// app/components/ui/spinner/index.ts
export { default } from './spinner'
export type { ISpinnerProps, TSpinnerSize, TSpinnerColor } from './spinner.type'
```

### complex feature component

tech radar component with external library integration:

```typescript
// app/views/home/components/tech-radar/tech-radar.type.ts
export interface IRadarConfig {
  svg_id: string
  width: number
  height: number
  colors: {
    background: string
    grid: string
    inactive: string
  }
  title: string
  quadrants: Array<{ name: string }>
  rings: Array<{ name: string; color: string }>
  entries: IRadarEntry[]
}

export interface IRadarEntry {
  label: string
  quadrant: number
  ring: number
  moved: number
}

// app/views/home/components/tech-radar/tech-radar.const.ts
import { IRadarConfig } from './tech-radar.type'

export const TECH_RADAR_CONFIG: IRadarConfig = {
  svg_id: 'radar',
  width: 1450,
  height: 1000,
  colors: {
    background: '#fff',
    grid: '#bbb',
    inactive: '#ddd'
  },
  title: 'Frontend Tech Radar',
  quadrants: [
    { name: 'Languages & Frameworks' },
    { name: 'Data & APIs' },
    { name: 'Testing & Quality' },
    { name: 'Tools & Infrastructure' }
  ],
  rings: [
    { name: 'ADOPT', color: '#5ba300' },
    { name: 'TRIAL', color: '#009eb0' },
    { name: 'ASSESS', color: '#c7ba00' },
    { name: 'HOLD', color: '#e09b96' }
  ],
  entries: [
    {
      label: 'React',
      quadrant: 0,
      ring: 0,
      moved: 0
    },
    {
      label: 'Next.js',
      quadrant: 0,
      ring: 0,
      moved: 1
    },
    {
      label: 'TypeScript',
      quadrant: 0,
      ring: 0,
      moved: 0
    }
  ]
}

// app/views/home/components/tech-radar/tech-radar.tsx
import Script from 'next/script'
import { useEffect, useRef } from 'react'
import { TECH_RADAR_CONFIG } from './tech-radar.const'
import type { IRadarConfig } from './tech-radar.type'

interface ITechRadarProps {
  config?: IRadarConfig
}

const TechRadar: React.FC<ITechRadarProps> = ({
  config = TECH_RADAR_CONFIG
}) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const initializeRadar = () => {
      if (typeof window !== 'undefined' && window.radar_visualization && window.d3) {
        // clear existing radar
        window.d3.select(`#${config.svg_id}`).selectAll('*').remove()

        // initialize new radar
        window.radar_visualization(config)
      }
    }

    // delay initialization to ensure scripts are loaded
    timeoutRef.current = setTimeout(initializeRadar, 100)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [config])

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="/js/tech-radar.js"
        strategy="beforeInteractive"
      />

      <div className="w-full overflow-hidden flex items-center justify-center min-h-screen">
        <div id={config.svg_id} />
      </div>
    </>
  )
}

export default TechRadar
```

## data fetching patterns

### rest api integration

pokemon species data fetching with tanstack query:

```typescript
// app/services/http/rest/rest.client.ts
import { IRestHttpAdapter, IHttpRequestConfig } from '../core/core.type'
import { axiosAdapter } from './adapters/axios.adapter'

class RestClient {
  constructor(private adapter: IRestHttpAdapter) {}

  async get<TResponse>(
    url: string,
    config: Omit<IHttpRequestConfig, 'method'> = {}
  ): Promise<TResponse> {
    return this.adapter.request<TResponse>(url, {
      ...config,
      method: 'GET'
    })
  }

  async post<TResponse>(
    url: string,
    data: unknown,
    config: Omit<IHttpRequestConfig, 'method' | 'body'> = {}
  ): Promise<TResponse> {
    return this.adapter.request<TResponse>(url, {
      ...config,
      method: 'POST',
      body: data
    })
  }
}

export const restClient = new RestClient(axiosAdapter)

// app/views/pokemon/services/pokemon-species.service.ts
import { restClient } from '@/services/http/rest'
import type { IPokemonSpecies } from '../types/pokemon.type'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonSpecies = async (id: number): Promise<IPokemonSpecies> => {
  const response = await restClient.get<any>(`/pokemon-species/${id}`, {
    baseUrl: API_BASE_URL
  })

  return {
    id: response.id,
    name: response.name,
    evolutionChain: response.evolution_chain?.url?.split('/').slice(-2)[0] || '',
    habitat: response.habitat?.name || 'unknown',
    flavorText: response.flavor_text_entries
      ?.find(entry => entry.language.name === 'en')
      ?.flavor_text || ''
  }
}

// app/views/pokemon/hooks/pokemon-species.hook.ts
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpecies } from '../services/pokemon-species.service'

const POKEMON_SPECIES_QUERY_KEY = 'pokemon-species'

const POKEMON_SPECIES_CONFIG = {
  SPECIES_CACHE_MINUTES: 30,
  SPECIES_GC_MINUTES: 60,
  RETRY_COUNT: 2
} as const

export const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: () => fetchPokemonSpecies(id),
    staleTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_CACHE_MINUTES,
    gcTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_GC_MINUTES,
    retry: POKEMON_SPECIES_CONFIG.RETRY_COUNT,
    enabled: !!id
  })
}

// app/views/pokemon/components/pokemon-species-info/pokemon-species-info.tsx
import Spinner from '@/components/ui/spinner'
import { usePokemonSpecies } from '../../hooks/pokemon-species.hook'

interface IPokemonSpeciesInfoProps {
  pokemonId: number
}

const PokemonSpeciesInfo: React.FC<IPokemonSpeciesInfoProps> = ({ pokemonId }) => {
  const { data, isLoading, error, retry } = usePokemonSpecies(pokemonId)

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" text="loading pokemon data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">failed to load pokemon species</p>
        <button
          onClick={() => retry()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          try again
        </button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">no pokemon data found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold capitalize mb-4">{data.name}</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">habitat</h3>
          <p className="capitalize">{data.habitat}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">evolution chain</h3>
          <p className="capitalize">{data.evolutionChain.replace('-', ' → ')}</p>
        </div>

        {data.flavorText && (
          <div>
            <h3 className="font-semibold text-gray-700">description</h3>
            <p className="text-gray-600 leading-relaxed">{data.flavorText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonSpeciesInfo
```

### state management integration

zustand store with persistent state:

```typescript
// app/stores/auth/auth.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authService } from '@/services/auth'
import type { IUser, ICredentials } from '@/types/auth.type'

interface IAuthState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface IAuthActions {
  login: (credentials: ICredentials) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  initialize: () => Promise<void>
}

type TAuthStore = IAuthState & IAuthActions

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
      // initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // actions
      login: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await authService.login(credentials)
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'login failed',
            isLoading: false,
            isAuthenticated: false,
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })

        try {
          await authService.logout()
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      },

      clearError: () => set({ error: null }),

      initialize: async () => {
        set({ isLoading: true })

        try {
          const user = await authService.getCurrentUser()
          if (user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ isLoading: false })
          }
        } catch (error) {
          set({
            isLoading: false,
            error: 'authentication initialization failed',
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// usage hooks
export const useAuth = () => {
  return useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
  }))
}

export const useAuthActions = () => {
  return useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    clearError: state.clearError,
    initialize: state.initialize,
  }))
}
```

## form handling patterns

### react hook form with zod validation

comprehensive form implementation:

```typescript
// app/views/auth/components/login-form/login-form.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'email is required')
    .email('invalid email format'),

  password: z
    .string()
    .min(8, 'password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'password must contain uppercase, lowercase, and number'
    ),

  rememberMe: z.boolean().optional()
})

export type TLoginForm = z.infer<typeof loginSchema>

// app/views/auth/components/login-form/login-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuthActions } from '@/stores/auth'
import Spinner from '@/components/ui/spinner'
import { loginSchema, type TLoginForm } from './login-form.schema'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const { login } = useAuthActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (data: TLoginForm) => {
    try {
      clearErrors()
      await login(data)
      router.push('/dashboard')
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'login failed'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          email address
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`
            mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-blue-500
            ${errors.email ? 'border-red-300' : ''}
          `}
          placeholder="enter your email"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={`
            mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-blue-500
            ${errors.password ? 'border-red-300' : ''}
          `}
          placeholder="enter your password"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          {...register('rememberMe')}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
          remember me
        </label>
      </div>

      {errors.root && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full flex justify-center py-2 px-4 border border-transparent
          rounded-md shadow-sm text-sm font-medium text-white
          bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? (
          <Spinner size="sm" color="gray" />
        ) : (
          'sign in'
        )}
      </button>
    </form>
  )
}

export default LoginForm
```

## testing patterns

### component testing with react testing library

comprehensive test examples:

```typescript
// app/components/ui/spinner/spinner.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Spinner from './spinner'
import type { ISpinnerProps } from './spinner.type'

describe('Spinner Component', () => {
  const defaultProps: ISpinnerProps = {
    size: 'md',
    color: 'blue'
  }

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Spinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('h-6', 'w-6', 'border-blue-400')
    })

    it('should apply custom size and color', () => {
      render(<Spinner size="lg" color="green" />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-8', 'w-8', 'border-green-400')
    })

    it('should display text when provided', () => {
      const text = 'loading data...'
      render(<Spinner text={text} />)

      expect(screen.getByText(text)).toBeInTheDocument()
    })

    it('should merge custom className', () => {
      const customClass = 'custom-spinner'
      render(<Spinner className={customClass} />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(customClass)
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      render(<Spinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveAttribute('aria-label', 'loading')
    })
  })
})

// app/views/pokemon/hooks/pokemon-species.hook.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { usePokemonSpecies } from './pokemon-species.hook'
import { createMockPokemonSpecies } from '@/test/mocks/pokemon'
import * as pokemonService from '../services/pokemon-species.service'

vi.mock('../services/pokemon-species.service')
const mockFetchPokemonSpecies = vi.mocked(pokemonService.fetchPokemonSpecies)

describe('usePokemonSpecies Hook', () => {
  let queryClient: QueryClient
  let wrapper: React.FC<{ children: React.ReactNode }>

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllMocks()
  })

  it('should fetch pokemon species successfully', async () => {
    const mockSpecies = createMockPokemonSpecies({ id: 25, name: 'pikachu' })
    mockFetchPokemonSpecies.mockResolvedValue(mockSpecies)

    const { result } = renderHook(() => usePokemonSpecies(25), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockSpecies)
    expect(mockFetchPokemonSpecies).toHaveBeenCalledWith(25)
  })

  it('should handle errors gracefully', async () => {
    const error = new Error('pokemon not found')
    mockFetchPokemonSpecies.mockRejectedValue(error)

    const { result } = renderHook(() => usePokemonSpecies(999), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => usePokemonSpecies(0), { wrapper })

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(mockFetchPokemonSpecies).not.toHaveBeenCalled()
  })
})
```

## layout patterns

### responsive layout components

header and footer with navigation:

```typescript
// app/components/structure/header/header.tsx
import Link from 'next/link'
import { useAuth, useAuthActions } from '@/stores/auth'

const Header: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const { logout } = useAuthActions()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('logout failed:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                pokemon app
              </span>
            </Link>
          </div>

          {/* navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              home
            </Link>

            <Link
              href="/pokemon"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              pokemon
            </Link>

            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                dashboard
              </Link>
            )}
          </nav>

          {/* user menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

// app/(routes)/(public)/layout.tsx
import Header from '@/app/components/structure/header'
import Footer from '@/app/components/structure/footer'

interface IPublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout: React.FC<IPublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
```

## error handling patterns

### error boundaries and error states

comprehensive error handling:

```typescript
// app/components/error/error-boundary.tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface IErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

interface IErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // log error to monitoring service
    this.props.onError?.(error, errorInfo)

    console.error('error boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo)
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                something went wrong
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>we apologize for the inconvenience. please try refreshing the page.</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  refresh page
                </button>

                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// app/error.tsx
'use client'

import { useEffect } from 'react'

interface IErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage: React.FC<IErrorPageProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error('application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          oops! something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          we encountered an unexpected error. please try again.
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
        >
          try again
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
```

## performance optimization patterns

### code splitting and lazy loading

dynamic imports for performance optimization:

```typescript
// app/views/dashboard/dashboard.tsx
import { lazy, Suspense } from 'react'
import Spinner from '@/components/ui/spinner'

// lazy load heavy components
const TechRadar = lazy(() => import('@/views/home/components/tech-radar'))
const PokemonChart = lazy(() => import('./components/pokemon-chart'))
const UserAnalytics = lazy(() => import('./components/user-analytics'))

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Suspense fallback={<Spinner size="lg" text="loading tech radar..." />}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">technology radar</h2>
            <TechRadar />
          </div>
        </Suspense>

        <Suspense fallback={<Spinner size="lg" text="loading pokemon data..." />}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">pokemon analytics</h2>
            <PokemonChart />
          </div>
        </Suspense>
      </div>

      <div className="mt-8">
        <Suspense fallback={<Spinner size="lg" text="loading user analytics..." />}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">user insights</h2>
            <UserAnalytics />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Dashboard

// app/utils/dynamic-import.util.ts
import { lazy, ComponentType } from 'react'

interface IDynamicImportOptions {
  fallback?: React.ComponentType
  retryCount?: number
  retryDelay?: number
}

export const createDynamicImport = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: IDynamicImportOptions = {}
) => {
  const { retryCount = 3, retryDelay = 1000 } = options

  const retryImport = async (fn: () => Promise<{ default: T }>, attempts: number): Promise<{ default: T }> => {
    try {
      return await fn()
    } catch (error) {
      if (attempts > 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        return retryImport(fn, attempts - 1)
      }
      throw error
    }
  }

  return lazy(() => retryImport(importFn, retryCount))
}

// usage example
const LazyTechRadar = createDynamicImport(
  () => import('@/views/home/components/tech-radar'),
  { retryCount: 3, retryDelay: 1000 }
)
```

This comprehensive `docs/examples.md` file provides practical and extensive implementation examples covering the main patterns used in the project, from basic components to complex API integration and state management. The examples follow the conventions established in the documentation and demonstrate good development practices.
