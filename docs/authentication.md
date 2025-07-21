# Authentication

Security implementation covering authentication flows, token lifecycle management, authorization patterns, and security compliance requirements.

## authentication strategy

### token-based authentication

jwt tokens provide stateless authentication with secure token management:

```typescript
// auth service interface
interface IAuthService {
  login(credentials: ICredentials): Promise<IAuthResponse>
  logout(): Promise<void>
  refreshToken(): Promise<IAuthResponse>
  getCurrentUser(): Promise<IUser | null>
  validateToken(token: string): boolean
}

// auth response structure
interface IAuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: IUser
}

// credentials interface
interface ICredentials {
  email: string
  password: string
}
```

### auth service implementation

centralized authentication service handles token operations:

```typescript
class AuthService implements IAuthService {
  private readonly apiClient: IRestHttpAdapter
  private readonly tokenStorage: ITokenStorage

  constructor(apiClient: IRestHttpAdapter, tokenStorage: ITokenStorage) {
    this.apiClient = apiClient
    this.tokenStorage = tokenStorage
  }

  async login(credentials: ICredentials): Promise<IAuthResponse> {
    try {
      const response = await this.apiClient.request<IAuthResponse>(
        '/auth/login',
        {
          method: 'POST',
          body: credentials,
        },
      )

      // store tokens securely
      await this.tokenStorage.setAccessToken(response.accessToken)
      await this.tokenStorage.setRefreshToken(response.refreshToken)

      return response
    } catch (error) {
      throw new AuthenticationError('login failed', error)
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = await this.tokenStorage.getRefreshToken()

      if (refreshToken) {
        await this.apiClient.request('/auth/logout', {
          method: 'POST',
          body: { refreshToken },
        })
      }
    } finally {
      // always clear local tokens
      await this.tokenStorage.clearTokens()
    }
  }

  async refreshToken(): Promise<IAuthResponse> {
    const refreshToken = await this.tokenStorage.getRefreshToken()

    if (!refreshToken) {
      throw new AuthenticationError('no refresh token available')
    }

    try {
      const response = await this.apiClient.request<IAuthResponse>(
        '/auth/refresh',
        {
          method: 'POST',
          body: { refreshToken },
        },
      )

      await this.tokenStorage.setAccessToken(response.accessToken)
      await this.tokenStorage.setRefreshToken(response.refreshToken)

      return response
    } catch (error) {
      // refresh failed, clear tokens
      await this.tokenStorage.clearTokens()
      throw new AuthenticationError('token refresh failed', error)
    }
  }

  validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)

      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  async getCurrentUser(): Promise<IUser | null> {
    const token = await this.tokenStorage.getAccessToken()

    if (!token || !this.validateToken(token)) {
      return null
    }

    try {
      return await this.apiClient.request<IUser>('/auth/me', {
        headers: { authorization: `bearer ${token}` },
      })
    } catch {
      return null
    }
  }
}
```

## token management

### secure token storage

token storage handles sensitive authentication data:

```typescript
interface ITokenStorage {
  getAccessToken(): Promise<string | null>
  setAccessToken(token: string): Promise<void>
  getRefreshToken(): Promise<string | null>
  setRefreshToken(token: string): Promise<void>
  clearTokens(): Promise<void>
}

// browser storage implementation
class BrowserTokenStorage implements ITokenStorage {
  private readonly ACCESS_TOKEN_KEY = 'auth_access_token'
  private readonly REFRESH_TOKEN_KEY = 'auth_refresh_token'

  async getAccessToken(): Promise<string | null> {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  async setAccessToken(token: string): Promise<void> {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  async setRefreshToken(token: string): Promise<void> {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  async clearTokens(): Promise<void> {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }
}

// secure storage with encryption (recommended for production)
class EncryptedTokenStorage implements ITokenStorage {
  private readonly encryptionKey: string

  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey
  }

  private encrypt(data: string): string {
    // implement encryption logic
    return btoa(data) // simplified example
  }

  private decrypt(encryptedData: string): string {
    // implement decryption logic
    return atob(encryptedData) // simplified example
  }

  async getAccessToken(): Promise<string | null> {
    const encrypted = localStorage.getItem('auth_token')
    return encrypted ? this.decrypt(encrypted) : null
  }

  async setAccessToken(token: string): Promise<void> {
    const encrypted = this.encrypt(token)
    localStorage.setItem('auth_token', encrypted)
  }

  // implement other methods similarly
}
```

### automatic token refresh

token refresh middleware maintains session continuity:

```typescript
// http interceptor for automatic token refresh
class TokenRefreshInterceptor {
  constructor(
    private readonly authService: IAuthService,
    private readonly tokenStorage: ITokenStorage,
  ) {}

  async onRequest(config: IHttpRequestConfig): Promise<IHttpRequestConfig> {
    const token = await this.tokenStorage.getAccessToken()

    if (token && this.authService.validateToken(token)) {
      config.headers = {
        ...config.headers,
        authorization: `bearer ${token}`,
      }
    }

    return config
  }

  async onResponseError(
    error: IHttpError,
    originalConfig: IHttpRequestConfig,
  ): Promise<any> {
    if (error.status === 401 && !originalConfig._isRetry) {
      originalConfig._isRetry = true

      try {
        await this.authService.refreshToken()

        // retry original request with new token
        const newToken = await this.tokenStorage.getAccessToken()
        originalConfig.headers.authorization = `bearer ${newToken}`

        return this.httpClient.request(originalConfig.url, originalConfig)
      } catch (refreshError) {
        // refresh failed, redirect to login
        window.location.href = '/login'
        throw refreshError
      }
    }

    throw error
  }
}
```

## authentication state

### auth store implementation

zustand store manages authentication state:

```typescript
interface IAuthStore {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: ICredentials) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
  clearError: () => void
  initialize: () => Promise<void>
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

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
        error: error.message,
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

  refreshAuth: async () => {
    try {
      const response = await authService.refreshToken()
      set({
        user: response.user,
        isAuthenticated: true,
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
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
}))
```

### auth context provider

react context provides authentication to component tree:

```typescript
interface IAuthContextProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const initialize = useAuthStore(state => state.initialize)
  const isLoading = useAuthStore(state => state.isLoading)

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return (
      <div className="auth-loading">
        <Spinner text="initializing authentication..." />
      </div>
    )
  }

  return <>{children}</>
}

// app root integration
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
```

## route protection

### protected route component

route guards enforce authentication requirements:

```typescript
interface IProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  requiredRoles?: string[]
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login',
  requiredRoles = []
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    isLoading: state.isLoading
  }))

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, {
        state: { from: location.pathname },
        replace: true
      })
      return
    }

    if (requiredRoles.length > 0 && user) {
      const hasRequiredRole = requiredRoles.some(role =>
        user.roles?.includes(role)
      )

      if (!hasRequiredRole) {
        navigate('/unauthorized', { replace: true })
        return
      }
    }
  }, [isAuthenticated, user, isLoading, navigate, location])

  if (isLoading) return <Spinner />

  if (requireAuth && !isAuthenticated) return null

  return <>{children}</>
}

// usage in routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/public" element={<PublicPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
```

### conditional rendering

component-level authentication checks:

```typescript
// auth-aware components
const NavigationMenu = () => {
  const { isAuthenticated, user } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user
  }))

  return (
    <nav className="navigation">
      <Link to="/">home</Link>

      {isAuthenticated ? (
        <>
          <Link to="/dashboard">dashboard</Link>
          <Link to="/profile">profile</Link>

          {user?.roles?.includes('admin') && (
            <Link to="/admin">admin</Link>
          )}

          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
        </>
      )}
    </nav>
  )
}

// permission-based components
interface IRequirePermissionProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

const RequirePermission: React.FC<IRequirePermissionProps> = ({
  permission,
  children,
  fallback = null
}) => {
  const user = useAuthStore(state => state.user)

  const hasPermission = user?.permissions?.includes(permission) || false

  return hasPermission ? <>{children}</> : <>{fallback}</>
}
```

## security best practices

### csrf protection

cross-site request forgery protection:

```typescript
// csrf token management
class CSRFTokenManager {
  private token: string | null = null

  async getToken(): Promise<string> {
    if (!this.token) {
      const response = await fetch('/api/csrf-token', {
        credentials: 'include',
      })
      const data = await response.json()
      this.token = data.csrfToken
    }

    return this.token
  }

  async addTokenToRequest(
    config: IHttpRequestConfig,
  ): Promise<IHttpRequestConfig> {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method)) {
      const token = await this.getToken()
      config.headers = {
        ...config.headers,
        'x-csrf-token': token,
      }
    }

    return config
  }
}
```

### secure headers

security headers for api requests:

```typescript
// security headers interceptor
class SecurityHeadersInterceptor {
  onRequest(config: IHttpRequestConfig): IHttpRequestConfig {
    config.headers = {
      ...config.headers,
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'deny',
      'x-xss-protection': '1; mode=block',
      'referrer-policy': 'strict-origin-when-cross-origin',
    }

    return config
  }
}
```

### input validation

client-side validation with zod schemas:

```typescript
// login form validation
const loginSchema = z.object({
  email: z.string()
    .email('invalid email format')
    .min(1, 'email is required'),
  password: z.string()
    .min(8, 'password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'password must contain uppercase, lowercase, and number')
})

type TLoginForm = z.infer<typeof loginSchema>

// form component with validation
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const login = useAuthStore(state => state.login)

  const onSubmit = async (data: TLoginForm) => {
    try {
      await login(data)
    } catch (error) {
      // error handling
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        {...register('email')}
        placeholder="email address"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password')}
        placeholder="password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">login</button>
    </form>
  )
}
```

## testing authentication

### auth service testing

unit tests for authentication logic:

```typescript
describe('AuthService', () => {
  let authService: AuthService
  let mockApiClient: jest.Mocked<IRestHttpAdapter>
  let mockTokenStorage: jest.Mocked<ITokenStorage>

  beforeEach(() => {
    mockApiClient = createMockApiClient()
    mockTokenStorage = createMockTokenStorage()
    authService = new AuthService(mockApiClient, mockTokenStorage)
  })

  describe('login', () => {
    it('should store tokens on successful login', async () => {
      const mockResponse = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: '1', email: 'test@example.com' },
      }

      mockApiClient.request.mockResolvedValue(mockResponse)

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password',
      })

      expect(mockTokenStorage.setAccessToken).toHaveBeenCalledWith(
        'access-token',
      )
      expect(mockTokenStorage.setRefreshToken).toHaveBeenCalledWith(
        'refresh-token',
      )
      expect(result).toEqual(mockResponse)
    })

    it('should throw error on failed login', async () => {
      mockApiClient.request.mockRejectedValue(new Error('invalid credentials'))

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow('login failed')
    })
  })
})
```

### integration testing

end-to-end authentication flow testing:

```typescript
describe('Authentication Flow', () => {
  it('should complete login flow successfully', async () => {
    render(<App />, { wrapper: TestWrapper })

    // navigate to login page
    fireEvent.click(screen.getByText('login'))

    // fill login form
    fireEvent.change(screen.getByPlaceholderText('email address'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' }
    })

    // submit form
    fireEvent.click(screen.getByText('login'))

    // verify successful authentication
    await waitFor(() => {
      expect(screen.getByText('dashboard')).toBeInTheDocument()
    })
  })

  it('should redirect unauthenticated users', async () => {
    render(<ProtectedRoute><Dashboard /></ProtectedRoute>, { wrapper: TestWrapper })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object))
    })
  })
})
```
