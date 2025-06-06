# Testing

## 🧪 Testing Strategy

This template comes with a comprehensive testing setup using **Jest** and **React Testing Library**, following modern testing best practices for React applications.

### Testing Philosophy

- **Test behavior, not implementation** - Focus on what the user sees and does
- **Write tests as you develop** - TDD/test-first approach when possible
- **Keep tests simple and readable** - Tests should be easy to understand and maintain
- **Mock external dependencies** - Isolate units under test
- **Test the happy path and edge cases** - Cover both successful flows and error scenarios

---

## ⚙️ Jest Configuration

Jest is configured to work seamlessly with Next.js and TypeScript:

### `jest.config.ts`

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

### `jest.setup.ts`

```typescript
import '@testing-library/jest-dom'

// Global test setup
beforeEach(() => {
  // Reset any mocks before each test
  jest.clearAllMocks()
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
```

---

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- button.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="should render"

# Run tests for changed files only
npm test -- --onlyChanged
```

### Advanced Options

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests in a specific directory
npm test -- components/

# Run tests and update snapshots
npm test -- --updateSnapshot

# Run tests without cache
npm test -- --no-cache
```

---

## 🧩 Component Testing

### Basic Component Test

```typescript
// components/ui/button/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

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

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should apply correct variant classes', () => {
    render(<Button variant="secondary">Test</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-200')
  })
})
```

### Testing Components with Props

```typescript
// components/ui/input/input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
  it('should render with placeholder', () => {
    render(<Input placeholder="Enter your name" />)

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('should call onChange when value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'new value'
        })
      })
    )
  })

  it('should show error state', () => {
    render(<Input error="This field is required" />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })
})
```

### Testing Components with State

```typescript
// components/ui/modal/modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './modal'

describe('Modal', () => {
  it('should render when open', () => {
    render(
      <Modal isOpen title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(
      <Modal isOpen={false} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    fireEvent.click(screen.getByLabelText('Close'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    fireEvent.click(screen.getByTestId('modal-backdrop'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
```

---

## 📱 View Testing

### Testing Views with Props

```typescript
// views/home/home.test.tsx
import { render, screen } from '@testing-library/react'
import ViewHome from './home'

describe('ViewHome', () => {
  const mockHomeData = {
    title: 'Welcome to Our App',
    subtitle: 'Build amazing things',
    ctaText: 'Get Started',
  }

  const mockFeatures = [
    {
      id: '1',
      icon: '🚀',
      title: 'Fast',
      description: 'Lightning fast performance',
    },
    {
      id: '2',
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security',
    },
  ]

  it('should render main heading', () => {
    render(<ViewHome homeData={mockHomeData} features={mockFeatures} />)

    expect(screen.getByText('Welcome to Our App')).toBeInTheDocument()
  })

  it('should render all features', () => {
    render(<ViewHome homeData={mockHomeData} features={mockFeatures} />)

    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Secure')).toBeInTheDocument()
    expect(screen.getByText('Lightning fast performance')).toBeInTheDocument()
  })

  it('should render CTA button', () => {
    render(<ViewHome homeData={mockHomeData} features={mockFeatures} />)

    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })
})
```

### Testing Views with Hooks

```typescript
// views/user-profile/user-profile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ViewUserProfile from './user-profile'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer',
  createdAt: '2023-01-15T00:00:00Z',
}

describe('ViewUserProfile', () => {
  it('should render user information', () => {
    render(<ViewUserProfile user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Software developer')).toBeInTheDocument()
  })

  it('should show edit form when editing', () => {
    render(<ViewUserProfile user={mockUser} isEditable />)

    fireEvent.click(screen.getByText('Edit Profile'))

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  it('should call onSave when form is submitted', async () => {
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
})
```

---

## 🎣 Hook Testing

### Testing Custom Hooks

```typescript
// hooks/use-local-storage/use-local-storage.test.ts
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
})
```

### Testing View-Specific Hooks

```typescript
// views/user-profile/user-profile.hook.test.ts
import { renderHook, act } from '@testing-library/react'
import { useUserProfile } from './user-profile.hook'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer',
  createdAt: '2023-01-15T00:00:00Z',
}

describe('useUserProfile', () => {
  it('should initialize with user data', () => {
    const { result } = renderHook(() => useUserProfile(mockUser))

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isEditing).toBe(false)
  })

  it('should enter edit mode', () => {
    const { result } = renderHook(() => useUserProfile(mockUser))

    act(() => {
      result.current.startEditing()
    })

    expect(result.current.isEditing).toBe(true)
    expect(result.current.formData.name).toBe(mockUser.name)
  })

  it('should update form data', () => {
    const { result } = renderHook(() => useUserProfile(mockUser))

    act(() => {
      result.current.startEditing()
    })

    act(() => {
      result.current.updateFormData('name', 'Jane Doe')
    })

    expect(result.current.formData.name).toBe('Jane Doe')
  })

  it('should save profile', async () => {
    const mockOnSave = jest.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useUserProfile(mockUser, mockOnSave))

    act(() => {
      result.current.startEditing()
    })

    act(() => {
      result.current.updateFormData('name', 'Jane Doe')
    })

    await act(async () => {
      await result.current.saveProfile()
    })

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockUser,
      name: 'Jane Doe',
    })
    expect(result.current.isEditing).toBe(false)
  })
})
```

---

## 🔧 Service Testing

### Testing API Services

```typescript
// services/auth/auth.test.ts
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

  it('should handle login errors', async () => {
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

  it('should handle network errors', async () => {
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

---

## 🗃️ Store Testing

### Testing Zustand Stores

```typescript
// stores/user/user.test.ts
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
})
```

---

## 🛠️ Utility Testing

### Testing Pure Functions

```typescript
// utils/format-date/format-date.test.ts
import { formatDate } from './format-date'

describe('formatDate', () => {
  const testDate = new Date('2024-01-15T10:30:00Z')

  it('should format date in short format', () => {
    const result = formatDate(testDate, { format: 'short' })
    expect(result).toBe('01/15/2024')
  })

  it('should format date in long format', () => {
    const result = formatDate(testDate, { format: 'long' })
    expect(result).toContain('January')
    expect(result).toContain('2024')
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
})
```

---

## 🎯 Mocking Strategies

### Mocking External Dependencies

```typescript
// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_API_URL: 'http://localhost:3000',
  }
})

afterEach(() => {
  process.env = originalEnv
})
```

### Mocking API Calls

```typescript
// Using MSW (Mock Service Worker) for API mocking
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      ]),
    )
  }),

  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({ id: '3', name: 'New User', email: 'new@example.com' }),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 📊 Coverage and Quality

### Coverage Configuration

Add to `jest.config.ts`:

```typescript
const config: Config = {
  // ... other config
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/index.ts',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/layout.tsx',
    '!app/**/page.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### Running Coverage

```bash
# Generate coverage report
npm test -- --coverage

# Open coverage report in browser
npm test -- --coverage --coverageReporters=html
open coverage/lcov-report/index.html
```

---

## 🔍 Testing Best Practices

### Do's

- ✅ **Test user interactions** - Click, type, submit
- ✅ **Test accessibility** - Screen readers, keyboard navigation
- ✅ **Test error states** - Loading, error messages, empty states
- ✅ **Use semantic queries** - getByRole, getByLabelText
- ✅ **Test one thing at a time** - Single responsibility per test
- ✅ **Use descriptive test names** - What should happen when

### Don'ts

- ❌ **Don't test implementation details** - Internal state, method calls
- ❌ **Don't test third-party libraries** - Trust they work
- ❌ **Don't write tests that test the framework** - React, Next.js behavior
- ❌ **Don't use shallow rendering** - Use render from @testing-library/react
- ❌ **Don't test what you can't control** - Network requests (mock them)

### Test Structure

```typescript
describe('ComponentName', () => {
  // Setup common props/data
  const defaultProps = {
    title: 'Test Title',
    onSave: jest.fn(),
  }

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  describe('when component mounts', () => {
    it('should render title correctly', () => {
      // Test implementation
    })

    it('should call onSave when save button is clicked', () => {
      // Test implementation
    })
  })

  describe('when loading', () => {
    it('should show loading spinner', () => {
      // Test implementation
    })
  })

  describe('when error occurs', () => {
    it('should display error message', () => {
      // Test implementation
    })
  })
})
```

---

## 🚀 Performance Testing

### Testing Performance with Jest

```typescript
// Performance test example
describe('Performance', () => {
  it('should render large list efficiently', () => {
    const startTime = performance.now()

    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      name: `Item ${i}`,
    }))

    render(<ItemList items={largeData} />)

    const endTime = performance.now()
    const renderTime = endTime - startTime

    // Assert that rendering takes less than 100ms
    expect(renderTime).toBeLessThan(100)
  })
})
```

---

## ✅ Summary

This testing setup provides:

- **Comprehensive coverage** - Components, views, hooks, services, stores
- **Modern testing practices** - React Testing Library, Jest
- **Realistic testing** - User-focused, behavior-driven
- **Maintainable tests** - Clear structure, good practices
- **Performance monitoring** - Coverage and performance metrics

The key is to write tests that give you confidence in your code while being maintainable and focused on user behavior rather than implementation details.
