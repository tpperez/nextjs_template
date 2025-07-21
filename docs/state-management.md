# State Management

Application state architecture covering state shape design, update mechanisms, persistence strategies, and performance optimization patterns.

## zustand store architecture

### store creation patterns

zustand provides lightweight state management with typescript integration:

```typescript
// basic store structure
interface IAuthState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface IAuthActions {
  login: (credentials: ICredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
}

type TAuthStore = IAuthState & IAuthActions

// store implementation
const useAuthStore = create<TAuthStore>((set, get) => ({
  // initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // actions
  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const user = await authService.login(credentials)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    })
    authService.clearToken()
  },

  clearError: () => set({ error: null }),
  setLoading: (isLoading) => set({ isLoading }),
}))
```

### store composition patterns

multiple stores handle different application domains:

```typescript
// theme store
interface IThemeStore {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}

const useThemeStore = create<IThemeStore>((set, get) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => {
    const current = get().theme
    const next = current === 'light' ? 'dark' : 'light'
    set({ theme: next })
  },
}))

// navigation store
interface INavigationStore {
  isMenuOpen: boolean
  currentRoute: string
  breadcrumbs: IBreadcrumb[]
  toggleMenu: () => void
  setRoute: (route: string) => void
  setBreadcrumbs: (breadcrumbs: IBreadcrumb[]) => void
}

const useNavigationStore = create<INavigationStore>((set, get) => ({
  isMenuOpen: false,
  currentRoute: '/',
  breadcrumbs: [],

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setRoute: (currentRoute) => set({ currentRoute }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}))
```

## state persistence

### local storage integration

persistent state survives browser sessions:

```typescript
// persistence middleware
const createPersistentStore = <T>(
  name: string,
  store: (set: any, get: any) => T,
) => {
  return create<T>()(
    persist(store, {
      name: `app-${name}`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // only persist specific fields
        theme: state.theme,
        userPreferences: state.userPreferences,
      }),
    }),
  )
}

// persistent theme store
const useThemeStore = createPersistentStore('theme', (set, get) => ({
  theme: 'system',
  userPreferences: {
    language: 'en',
    notifications: true,
  },
  setTheme: (theme) => set({ theme }),
  updatePreferences: (preferences) =>
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    })),
}))
```

### session storage patterns

temporary state for single browser sessions:

```typescript
// session-based store
const useSessionStore = create<ISessionStore>()(
  persist(
    (set, get) => ({
      sessionData: null,
      temporaryFlags: {},

      setSessionData: (data) => set({ sessionData: data }),
      setFlag: (key, value) =>
        set((state) => ({
          temporaryFlags: { ...state.temporaryFlags, [key]: value },
        })),
      clearSession: () => set({ sessionData: null, temporaryFlags: {} }),
    }),
    {
      name: 'app-session',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
```

## state selectors

### efficient component subscriptions

selectors prevent unnecessary re-renders:

```typescript
// specific value selectors
const useUser = () => useAuthStore((state) => state.user)
const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
const useAuthError = () => useAuthStore((state) => state.error)

// computed selectors
const useUserName = () =>
  useAuthStore((state) =>
    state.user ? `${state.user.firstName} ${state.user.lastName}` : 'guest',
  )

// multiple value selectors with shallow comparison
const useAuthStatus = () =>
  useAuthStore(
    (state) => ({
      isLoading: state.isLoading,
      isAuthenticated: state.isAuthenticated,
      error: state.error,
    }),
    shallow,
  )

// conditional selectors
const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    clearError: state.clearError,
  }))
```

### memoized selectors

complex computations with memoization:

```typescript
// memoized selector utilities
const createMemoizedSelector = <TState, TResult>(
  selector: (state: TState) => TResult,
  equalityFn?: (a: TResult, b: TResult) => boolean,
) => {
  let lastResult: TResult
  let lastState: TState

  return (state: TState): TResult => {
    if (state !== lastState) {
      const newResult = selector(state)
      if (!equalityFn || !equalityFn(lastResult, newResult)) {
        lastResult = newResult
      }
      lastState = state
    }
    return lastResult
  }
}

// memoized user permissions
const useUserPermissions = () =>
  useAuthStore(
    createMemoizedSelector(
      (state) => state.user?.roles?.flatMap((role) => role.permissions) || [],
      (a, b) => JSON.stringify(a) === JSON.stringify(b),
    ),
  )
```

## state updates

### immutable update patterns

state updates maintain immutability:

```typescript
// nested object updates
const useUserProfileStore = create<IUserProfileStore>((set, get) => ({
  profile: {
    personal: {
      name: '',
      email: '',
      phone: '',
    },
    preferences: {
      theme: 'system',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
    },
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      profile: {
        ...state.profile,
        personal: { ...state.profile.personal, ...info },
      },
    })),

  updateNotificationSettings: (notifications) =>
    set((state) => ({
      profile: {
        ...state.profile,
        preferences: {
          ...state.profile.preferences,
          notifications: {
            ...state.profile.preferences.notifications,
            ...notifications,
          },
        },
      },
    })),
}))
```

### array state management

efficient array operations:

```typescript
interface IListStore<T> {
  items: T[]
  loading: boolean
  error: string | null
  addItem: (item: T) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<T>) => void
  setItems: (items: T[]) => void
  clearItems: () => void
}

const createListStore = <T extends { id: string }>(name: string) =>
  create<IListStore<T>>((set, get) => ({
    items: [],
    loading: false,
    error: null,

    addItem: (item) => set((state) => ({ items: [...state.items, item] })),

    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

    updateItem: (id, updates) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        ),
      })),

    setItems: (items) => set({ items }),
    clearItems: () => set({ items: [] }),
  }))

// usage
const usePokemonListStore = createListStore<IPokemon>('pokemon')
```

## state synchronization

### cross-component communication

stores enable communication between distant components:

```typescript
// notification store for cross-component messaging
interface INotificationStore {
  notifications: INotification[]
  addNotification: (notification: Omit<INotification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const useNotificationStore = create<INotificationStore>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = crypto.randomUUID()
    const timestamp = Date.now()

    set(state => ({
      notifications: [
        ...state.notifications,
        { ...notification, id, timestamp }
      ]
    }))

    // auto-remove after delay
    setTimeout(() => {
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }))
    }, notification.duration || 5000)
  },

  removeNotification: (id) =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),

  clearNotifications: () => set({ notifications: [] })
}))

// usage in any component
const SomeComponent = () => {
  const addNotification = useNotificationStore(state => state.addNotification)

  const handleSuccess = () => {
    addNotification({
      type: 'success',
      message: 'operation completed successfully',
      duration: 3000
    })
  }

  return <button onClick={handleSuccess}>complete action</button>
}
```

### server state synchronization

coordinate client state with server updates:

```typescript
// sync store with react query
const usePokemonStore = create<IPokemonStore>((set, get) => ({
  selectedPokemon: null,
  favorites: [],

  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),

  addToFavorites: async (pokemon) => {
    // optimistic update
    set(state => ({
      favorites: [...state.favorites, pokemon]
    }))

    try {
      await saveFavorite(pokemon.id)
    } catch (error) {
      // revert on error
      set(state => ({
        favorites: state.favorites.filter(p => p.id !== pokemon.id)
      }))
      throw error
    }
  },

  syncWithServer: (serverFavorites) => {
    set({ favorites: serverFavorites })
  }
}))

// component integration
const PokemonManager = () => {
  const { data: serverFavorites } = useFavoritePokemon()
  const syncWithServer = usePokemonStore(state => state.syncWithServer)

  useEffect(() => {
    if (serverFavorites) {
      syncWithServer(serverFavorites)
    }
  }, [serverFavorites, syncWithServer])

  return <PokemonList />
}
```

## performance optimization

### subscription optimization

minimize re-renders through selective subscriptions:

```typescript
// component-specific hooks
const useAuthUI = () => {
  // only subscribe to ui-relevant auth state
  return useAuthStore(state => ({
    isLoading: state.isLoading,
    error: state.error,
    userName: state.user?.name
  }), shallow)
}

const useAuthActions = () => {
  // only subscribe to actions (stable references)
  return useAuthStore(state => ({
    login: state.login,
    logout: state.logout,
    clearError: state.clearError
  }))
}

// optimized component
const AuthStatus = () => {
  const { isLoading, error, userName } = useAuthUI()
  const { logout, clearError } = useAuthActions()

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} onClear={clearError} />

  return (
    <div>
      <span>welcome, {userName}</span>
      <button onClick={logout}>logout</button>
    </div>
  )
}
```

### state normalization

normalized state structure for efficient updates:

```typescript
// normalized state structure
interface INormalizedStore<T> {
  byId: Record<string, T>
  allIds: string[]
  loading: boolean
  error: string | null
}

const createNormalizedStore = <T extends { id: string }>(name: string) =>
  create<
    INormalizedStore<T> & {
      addItem: (item: T) => void
      addItems: (items: T[]) => void
      updateItem: (id: string, updates: Partial<T>) => void
      removeItem: (id: string) => void
      getItem: (id: string) => T | undefined
      getAllItems: () => T[]
    }
  >((set, get) => ({
    byId: {},
    allIds: [],
    loading: false,
    error: null,

    addItem: (item) =>
      set((state) => ({
        byId: { ...state.byId, [item.id]: item },
        allIds: state.allIds.includes(item.id)
          ? state.allIds
          : [...state.allIds, item.id],
      })),

    addItems: (items) =>
      set((state) => {
        const byId = { ...state.byId }
        const newIds = []

        items.forEach((item) => {
          byId[item.id] = item
          if (!state.allIds.includes(item.id)) {
            newIds.push(item.id)
          }
        })

        return {
          byId,
          allIds: [...state.allIds, ...newIds],
        }
      }),

    updateItem: (id, updates) =>
      set((state) => ({
        byId: {
          ...state.byId,
          [id]: { ...state.byId[id], ...updates },
        },
      })),

    removeItem: (id) =>
      set((state) => {
        const { [id]: removed, ...byId } = state.byId
        return {
          byId,
          allIds: state.allIds.filter((itemId) => itemId !== id),
        }
      }),

    getItem: (id) => get().byId[id],
    getAllItems: () => {
      const { byId, allIds } = get()
      return allIds.map((id) => byId[id])
    },
  }))
```

## testing state management

### store testing utilities

isolated store testing patterns:

```typescript
// test store creation
const createTestStore = <T>(initialState?: Partial<T>) => {
  const store = create<T>((set, get) => ({
    ...defaultState,
    ...initialState,
    // actions
  }))

  return store
}

// store testing
describe('useAuthStore', () => {
  let store: ReturnType<typeof createTestStore<TAuthStore>>

  beforeEach(() => {
    store = createTestStore({
      user: null,
      isAuthenticated: false,
    })
  })

  it('should login successfully', async () => {
    const mockUser = { id: '1', name: 'john doe' }
    vi.mocked(authService.login).mockResolvedValue(mockUser)

    await act(async () => {
      await store
        .getState()
        .login({ email: 'test@example.com', password: 'password' })
    })

    expect(store.getState().user).toEqual(mockUser)
    expect(store.getState().isAuthenticated).toBe(true)
  })

  it('should handle login error', async () => {
    const error = new Error('invalid credentials')
    vi.mocked(authService.login).mockRejectedValue(error)

    await act(async () => {
      await store
        .getState()
        .login({ email: 'test@example.com', password: 'wrong' })
    })

    expect(store.getState().error).toBe('invalid credentials')
    expect(store.getState().isAuthenticated).toBe(false)
  })
})
```

### integration testing

testing store integration with components:

```typescript
// component integration test
const TestWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('AuthStatus Integration', () => {
  it('should display user name after login', async () => {
    render(<AuthStatus />, { wrapper: TestWrapper })

    const loginButton = screen.getByText('login')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('welcome, john doe')).toBeInTheDocument()
    })
  })

  it('should show error message on login failure', async () => {
    vi.mocked(authService.login).mockRejectedValue(new Error('network error'))

    render(<AuthStatus />, { wrapper: TestWrapper })

    const loginButton = screen.getByText('login')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('network error')).toBeInTheDocument()
    })
  })
})
```
