# Practical Examples

This section centralizes all implementation examples for easy consultation and maintenance.

## 📋 Table of Contents

- [Creating Reusable Components](#-creating-reusable-components)
- [Creating Services](#-creating-services)
- [Creating Global Stores (Zustand)](#-creating-global-stores-zustand)
- [Creating Utilities](#-creating-utilities)
- [Creating Global Hooks](#-creating-global-hooks)
- [Creating Page Views](#-creating-page-views)
- [Next.js Routing](#-nextjs-routing)
- [Custom Hook Implementation](#-custom-hook-implementation)

---

## 🧩 Creating Reusable Components

### 1. Base Structure

```bash
# Create the component directory
mkdir app/components/ui/button
cd app/components/ui/button
```

### 2. Component Files

#### `button.const.ts`

```typescript
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const

export const BUTTON_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const

export const BUTTON_CLASSES = {
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  disabled: 'opacity-50 cursor-not-allowed',
} as const
```

#### `button.type.ts`

```typescript
import { BUTTON_VARIANTS, BUTTON_SIZES } from './button.const'

export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSize
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export type TButtonVariant = keyof typeof BUTTON_VARIANTS
export type TSize = keyof typeof BUTTON_SIZES
```

#### `button.hook.ts` (optional - for button-specific logic)

```typescript
import { useState } from 'react'

export const useButton = ({ onClick }: { onClick?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (!onClick) return

    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleClick }
}
```

#### `button.tsx`

```typescript
import { IButtonProps } from './button.type'
import { BUTTON_CLASSES } from './button.const'

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}: IButtonProps) => {
  const buttonClassName = [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.variant[variant],
    BUTTON_CLASSES.size[size],
    disabled && BUTTON_CLASSES.disabled,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

#### `button.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'
import { BUTTON_CLASSES } from './button.const'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply correct variant classes', () => {
    render(<Button variant="secondary">Test</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain(BUTTON_CLASSES.variant.secondary)
  })

  it('should apply correct size classes', () => {
    render(<Button size="lg">Large Button</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain(BUTTON_CLASSES.size.lg)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.className).toContain(BUTTON_CLASSES.disabled)
  })

  it('should merge custom className', () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })
})
```

#### `index.ts`

```typescript
export { Button } from './button'
export { useButton } from './button.hook'
export { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_CLASSES } from './button.const'
export type { IButtonProps, TButtonVariant, TSize } from './button.type'
```

---

## 🔧 Creating Services

### 1. Service Structure

```bash
# Create the service directory
mkdir app/services/auth
cd app/services/auth
```

### 2. Service Files

#### `auth.const.ts`

```typescript
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const

export const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_PREFIX: 'Bearer',
  EXPIRY_BUFFER: 60, // seconds before expiry to refresh
} as const

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_EXPIRED: 'Session expired, please login again',
  NETWORK_ERROR: 'Connection error, please try again',
  SERVER_ERROR: 'Server error, please try later',
} as const
```

#### `auth.type.ts`

```typescript
export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  user: IUser
  token: string
  refreshToken: string
}

export interface IUser {
  id: string
  name: string
  email: string
  role: TUserRole
}

export type TUserRole = 'admin' | 'user' | 'guest'
export type TAuthStatus = 'authenticated' | 'unauthenticated' | 'loading'
```

#### `auth.ts`

```typescript
import { ILoginRequest, ILoginResponse } from './auth.type'
import { AUTH_ENDPOINTS, AUTH_ERRORS } from './auth.const'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authService = {
  login: async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS)
        }
        throw new Error(AUTH_ERRORS.SERVER_ERROR)
      }

      return response.json()
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR)
      }
      throw error
    }
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_URL}${AUTH_ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      credentials: 'include',
    })
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error(AUTH_ERRORS.TOKEN_EXPIRED)
    }

    const data = await response.json()
    return data.token
  },

  register: async (userData: Omit<IUser, 'id'> & { password: string }) => {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(AUTH_ERRORS.SERVER_ERROR)
    }

    return response.json()
  },
}
```

#### `auth.test.ts`

```typescript
import { authService } from './auth'
import { AUTH_ENDPOINTS, AUTH_ERRORS } from './auth.const'

// Mock fetch
global.fetch = jest.fn()

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully', async () => {
    const mockResponse = {
      user: { id: '1', name: 'John', email: 'john@test.com', role: 'user' },
      token: 'token123',
      refreshToken: 'refresh123',
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await authService.login({
      email: 'john@test.com',
      password: 'password123',
    })

    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.LOGIN}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  })

  it('should throw error on invalid credentials', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    })

    await expect(
      authService.login({
        email: 'john@test.com',
        password: 'wrong',
      }),
    ).rejects.toThrow(AUTH_ERRORS.INVALID_CREDENTIALS)
  })

  it('should throw network error on connection failure', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Network failed'))

    await expect(
      authService.login({
        email: 'john@test.com',
        password: 'password123',
      }),
    ).rejects.toThrow(AUTH_ERRORS.NETWORK_ERROR)
  })
})
```

#### `index.ts`

```typescript
export { authService } from './auth'
export { AUTH_ENDPOINTS, TOKEN_CONFIG, AUTH_ERRORS } from './auth.const'
export type {
  ILoginRequest,
  ILoginResponse,
  IUser,
  TUserRole,
  TAuthStatus,
} from './auth.type'
```

---

## 🗃️ Creating Global Stores (Zustand)

### 1. Store Structure

```bash
# Create the store directory
mkdir app/stores/user
cd app/stores/user
```

### 2. Store Files

#### `user.const.ts`

```typescript
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

export const USER_PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  guest: ['read'],
} as const

export const USER_STORAGE_KEY = 'user-storage'

export const DEFAULT_USER_STATE = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
} as const
```

#### `user.type.ts`

```typescript
import { IUser } from '@/services/auth'

export interface IUserState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface IUserActions {
  setUser: (user: IUser) => void
  clearUser: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export type TUserStore = IUserState & IUserActions
```

#### `user.ts`

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TUserStore } from './user.type'
import { USER_STORAGE_KEY, DEFAULT_USER_STATE } from './user.const'

export const useUserStore = create<TUserStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state using constants
        ...DEFAULT_USER_STATE,

        // Actions
        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
            error: null,
          }),

        clearUser: () => set(DEFAULT_USER_STATE),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),
      }),
      {
        name: USER_STORAGE_KEY, // localStorage name from constants
        partialize: (state) => ({ user: state.user }), // Only persist user
      },
    ),
    {
      name: 'user-store', // DevTools name
    },
  ),
)
```

#### `user.test.ts`

```typescript
import { act, renderHook } from '@testing-library/react'
import { useUserStore } from './user'

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useUserStore.getState().clearUser()
  })

  it('should set user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@test.com',
      role: 'user' as const,
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('should clear user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    // First set a user
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@test.com',
      role: 'user' as const,
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    // Then clear
    act(() => {
      result.current.clearUser()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should handle error state', () => {
    const { result } = renderHook(() => useUserStore())

    const errorMessage = 'Authentication failed'

    act(() => {
      result.current.setError(errorMessage)
    })

    expect(result.current.error).toBe(errorMessage)
  })
})
```

#### `index.ts`

```typescript
export { useUserStore } from './user'
export {
  USER_ROLES,
  USER_PERMISSIONS,
  USER_STORAGE_KEY,
  DEFAULT_USER_STATE,
} from './user.const'
export type { IUserState, IUserActions, TUserStore } from './user.type'
```

---

## 🛠️ Creating Utilities

### 1. Utility Structure

```bash
# Create the utility directory
mkdir app/utils/format-date
cd app/utils/format-date
```

### 2. Utility Files

#### `format-date.const.ts`

```typescript
export const DATE_FORMATS = {
  SHORT: 'short',
  LONG: 'long',
  ISO: 'iso',
  RELATIVE: 'relative',
} as const

export const DEFAULT_LOCALE = 'en-US'

export const RELATIVE_TIME_UNITS: [string, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

export const DATE_FORMAT_OPTIONS = {
  short: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  long: {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
} as const
```

#### `format-date.type.ts`

```typescript
import { DATE_FORMATS } from './format-date.const'

export type TDateFormat = keyof typeof DATE_FORMATS

export interface IFormatDateOptions {
  format?: TDateFormat
  locale?: string
  timezone?: string
}
```

#### `format-date.ts`

```typescript
import { IFormatDateOptions } from './format-date.type'
import {
  DEFAULT_LOCALE,
  RELATIVE_TIME_UNITS,
  DATE_FORMAT_OPTIONS,
} from './format-date.const'

export const formatDate = (
  date: Date | string,
  options: IFormatDateOptions = {},
): string => {
  const { format = 'short', locale = DEFAULT_LOCALE, timezone } = options

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date')
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
  }

  switch (format) {
    case 'short':
      Object.assign(formatOptions, DATE_FORMAT_OPTIONS.short)
      break
    case 'long':
      Object.assign(formatOptions, DATE_FORMAT_OPTIONS.long)
      break
    case 'iso':
      return dateObj.toISOString()
    case 'relative':
      return formatRelativeTime(dateObj)
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj)
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  for (const [unit, seconds] of RELATIVE_TIME_UNITS) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      const rtf = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, {
        numeric: 'auto',
      })
      return rtf.format(-interval, unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return 'now'
}
```

#### `format-date.test.ts`

```typescript
import { formatDate } from './format-date'

describe('formatDate', () => {
  const testDate = new Date('2024-01-15T10:30:00')

  it('should format date in short format', () => {
    const result = formatDate(testDate, { format: 'short' })
    expect(result).toBe('01/15/2024')
  })

  it('should format date in long format', () => {
    const result = formatDate(testDate, { format: 'long' })
    expect(result).toContain('January')
    expect(result).toContain('2024')
  })

  it('should format date in ISO format', () => {
    const result = formatDate(testDate, { format: 'iso' })
    expect(result).toBe(testDate.toISOString())
  })

  it('should handle string dates', () => {
    const result = formatDate('2024-01-15', { format: 'short' })
    expect(result).toBe('01/15/2024')
  })

  it('should throw error for invalid date', () => {
    expect(() => formatDate('invalid-date')).toThrow('Invalid date')
  })

  it('should use custom locale', () => {
    const result = formatDate(testDate, {
      format: 'long',
      locale: 'es-ES',
    })
    expect(result).toContain('enero') // Spanish for January
  })

  it('should handle relative time', () => {
    const oneHourAgo = new Date(Date.now() - 3600000)
    const result = formatDate(oneHourAgo, { format: 'relative' })
    expect(result).toContain('hour')
  })
})
```

#### `index.ts`

```typescript
export { formatDate } from './format-date'
export {
  DATE_FORMATS,
  DEFAULT_LOCALE,
  RELATIVE_TIME_UNITS,
} from './format-date.const'
export type { TDateFormat, IFormatDateOptions } from './format-date.type'
```

---

## 🎣 Creating Global Hooks

### 1. Hook Structure

```bash
# Create the hook directory
mkdir app/hooks/use-local-storage
cd app/hooks/use-local-storage
```

### 2. Hook Files

#### `use-local-storage.type.ts`

```typescript
export interface IUseLocalStorageOptions {
  serializer?: (value: unknown) => string
  deserializer?: (value: string) => unknown
  syncData?: boolean
}

export type TSetValue<T> = T | ((prevValue: T) => T)
```

#### `use-local-storage.ts`

```typescript
import { useState, useEffect, useCallback } from 'react'
import { IUseLocalStorageOptions, TSetValue } from './use-local-storage.type'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: IUseLocalStorageOptions = {},
) => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncData = true,
  } = options

  // Initial state
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? deserializer(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Function to update value
  const setValue = useCallback(
    (value: TSetValue<T>) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, serializer, storedValue],
  )

  // Function to remove item
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Sync between tabs
  useEffect(() => {
    if (!syncData || typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return

      try {
        const newValue = e.newValue ? deserializer(e.newValue) : initialValue
        setStoredValue(newValue)
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue, deserializer, syncData])

  return [storedValue, setValue, removeValue] as const
}
```

#### `use-local-storage.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './use-local-storage'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should initialize with initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorageMock.getItem('test-key')).toBe('"updated"')
  })

  it('should handle objects', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-object', { name: 'John', age: 30 }),
    )

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 })
    })

    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 })
  })

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('value')
    })

    expect(localStorageMock.getItem('test-key')).toBe('"value"')

    act(() => {
      result.current[2]() // removeValue
    })

    expect(result.current[0]).toBe('initial')
    expect(localStorageMock.getItem('test-key')).toBeNull()
  })

  it('should accept function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-counter', 0))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(1)
  })
})
```

#### `index.ts`

```typescript
export { useLocalStorage } from './use-local-storage'
export type {
  IUseLocalStorageOptions,
  TSetValue,
} from './use-local-storage.type'
```

---

## 📱 Creating Page Views

### 1. View Structure

```bash
# Create the view directory
mkdir app/views/user-profile
cd app/views/user-profile
```

### 2. View Files

#### `user-profile.type.ts`

```typescript
export interface IUserProfileProps {
  user: IUser
  isEditable?: boolean
  onSave?: (user: IUser) => void
}

export interface IUser {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  createdAt: string
}

export interface IUserProfileFormData {
  name: string
  email: string
  bio: string
}
```

#### `user-profile.hook.ts` (optional - for view-specific logic)

```typescript
import { useState, useCallback } from 'react'
import { IUser, IUserProfileFormData } from './user-profile.type'

export const useUserProfile = (
  initialUser: IUser,
  onSave?: (user: IUser) => void,
) => {
  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<IUserProfileFormData>({
    name: initialUser.name,
    email: initialUser.email,
    bio: initialUser.bio || '',
  })

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio || '',
    })
  }, [user])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio || '',
    })
  }, [user])

  const saveProfile = useCallback(async () => {
    if (!onSave) return

    setIsSaving(true)
    try {
      const updatedUser = {
        ...user,
        ...formData,
      }

      await onSave(updatedUser)
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }, [user, formData, onSave])

  const updateFormData = useCallback(
    (field: keyof IUserProfileFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  return {
    user,
    isEditing,
    isSaving,
    formData,
    startEditing,
    cancelEditing,
    saveProfile,
    updateFormData,
  }
}
```

#### `user-profile.tsx`

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { IUserProfileProps } from './user-profile.type'
import { useUserProfile } from './user-profile.hook'
import { formatDate } from '@/utils/format-date'

const ViewUserProfile = ({ user, isEditable = false, onSave }: IUserProfileProps) => {
  const {
    user: currentUser,
    isEditing,
    isSaving,
    formData,
    startEditing,
    cancelEditing,
    saveProfile,
    updateFormData,
  } = useUserProfile(user, onSave)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-sm text-gray-500">
              Member since {formatDate(currentUser.createdAt, { format: 'long' })}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Bio
              </label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={saveProfile}
                disabled={isSaving}
                variant="primary"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={cancelEditing}
                disabled={isSaving}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentUser.bio && (
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">{currentUser.bio}</p>
              </div>
            )}

            {isEditable && (
              <div className="pt-4">
                <Button onClick={startEditing} variant="primary">
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default ViewUserProfile
```

#### `user-profile.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ViewUserProfile from './user-profile'
import { IUser } from './user-profile.type'

const mockUser: IUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer passionate about React and TypeScript.',
  createdAt: '2023-01-15T00:00:00Z',
}

describe('ViewUserProfile', () => {
  it('should render user information', () => {
    render(<ViewUserProfile user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText(mockUser.bio!)).toBeInTheDocument()
  })

  it('should show edit button when editable', () => {
    render(<ViewUserProfile user={mockUser} isEditable />)

    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
  })

  it('should not show edit button when not editable', () => {
    render(<ViewUserProfile user={mockUser} isEditable={false} />)

    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument()
  })

  it('should enter edit mode when edit button is clicked', () => {
    render(<ViewUserProfile user={mockUser} isEditable />)

    fireEvent.click(screen.getByText('Edit Profile'))

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('should call onSave when save is clicked', async () => {
    const mockOnSave = jest.fn().mockResolvedValue(undefined)
    render(<ViewUserProfile user={mockUser} isEditable onSave={mockOnSave} />)

    fireEvent.click(screen.getByText('Edit Profile'))

    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        ...mockUser,
        name: 'Jane Doe',
      })
    })
  })

  it('should cancel editing when cancel is clicked', () => {
    render(<ViewUserProfile user={mockUser} isEditable />)

    fireEvent.click(screen.getByText('Edit Profile'))

    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })

    fireEvent.click(screen.getByText('Cancel'))

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
  })
})
```

#### `index.ts`

```typescript
import ViewUserProfile from './user-profile'
export default ViewUserProfile
export { useUserProfile } from './user-profile.hook'
export type {
  IUserProfileProps,
  IUser,
  IUserProfileFormData,
} from './user-profile.type'
```

---

## 🛣️ Next.js Routing

### Route Structure with Queries

#### `app/(routes)/(public)/user-profile/page.tsx`

```typescript
import ViewUserProfile from '@/app/views/user-profile'
import { getUserProfile } from './queries'

interface IPageUserProfileProps {
  params: { id: string }
}

const PageUserProfile = async ({ params }: IPageUserProfileProps) => {
  const user = await getUserProfile(params.id)

  return (
    <ViewUserProfile
      user={user}
      isEditable
    />
  )
}

export default PageUserProfile

// Page metadata
export const metadata = {
  title: 'User Profile | My Application',
  description: 'View and edit user profile information'
}
```

#### `app/(routes)/(public)/user-profile/queries.ts`

```typescript
import { IUser } from '@/app/views/user-profile'

export const getUserProfile = async (userId: string): Promise<IUser> => {
  const response = await fetch(`/api/users/${userId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  return response.json()
}

export const updateUserProfile = async (
  userId: string,
  userData: Partial<IUser>,
): Promise<IUser> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Failed to update user profile')
  }

  return response.json()
}
```

### Custom Layouts

#### `app/(routes)/(public)/layout.tsx` - Layout for public pages

```typescript
import { Header } from '@/components/structure/header'
import { Footer } from '@/components/structure/footer'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {children}  {/* Here goes the page (ViewHome, ViewSample1, etc.) */}
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
```

---

## 🎣 Custom Hook Implementation

### Hook for Business Logic

#### `useUserManagement` - Hook to manage users

```typescript
import { useState, useCallback } from 'react'
import { IUser } from '@/app/views/user-profile'

export const useUserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const createUser = useCallback(
    async (userData: Omit<IUser, 'id' | 'createdAt'>) => {
      setLoading(true)
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (!response.ok) throw new Error('Failed to create user')
        const newUser = await response.json()
        setUsers((prev) => [...prev, newUser])
        return newUser
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const updateUser = useCallback(
    async (userId: string, userData: Partial<IUser>) => {
      setLoading(true)
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (!response.ok) throw new Error('Failed to update user')
        const updatedUser = await response.json()
        setUsers((prev) =>
          prev.map((user) => (user.id === userId ? updatedUser : user)),
        )
        return updatedUser
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete user')
      setUsers((prev) => prev.filter((user) => user.id !== userId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
```

### Using Custom Hooks

#### Clean component using custom hooks

```typescript
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUserManagement } from '@/hooks/use-user-management'

const UserList = () => {
  const { users, loading, error, fetchUsers, deleteUser } = useUserManagement()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  if (loading && users.length === 0) {
    return <div className="text-center py-4">Loading users...</div>
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        Error: {error}
        <Button onClick={fetchUsers} className="ml-2">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map(user => (
          <Card key={user.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => handleDelete(user.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UserList
```
