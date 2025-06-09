# Code Standards

> 📝 **Complete guide for writing consistent, quality code in this template.** Learn how to implement naming conventions, TypeScript patterns, and automated quality standards that scale with your project.

## 📋 Table of Contents

- [📋 Development Workflow](#-development-workflow)
  - [🔥 Basic Standards](#-basic-standards)
  - [🧩 Naming Conventions](#-naming-conventions)
  - [🏹 Code Structure](#-code-structure)
  - [🎯 Quality Assurance](#-quality-assurance)
- [🏗️ Implementation Patterns](#️-implementation-patterns)
  - [📝 Naming Conventions](#-naming-conventions-1)
  - [📘 TypeScript Conventions](#-typescript-conventions)
  - [🏹 Function & Component Structure](#-function--component-structure)
  - [🗃️ State Management Patterns](#️-state-management-patterns)
  - [🧪 Testing Patterns](#-testing-patterns)
  - [🔒 Quality Enforcement](#-quality-enforcement)
- [✅ Code Standards Summary](#-code-standards-summary)
  - [Implementation Checklist](#implementation-checklist)
  - [Standard Component Template](#standard-component-template)
  - [Key Benefits](#key-benefits)
  - [Related Documentation](#related-documentation)

---

## 📋 Development Workflow

**Step-by-step guide for writing quality code:**

### 🔥 Basic Standards

1. **Always use arrow functions** → No function declarations allowed
2. **Use explicit returns** → Always return explicitly, even for simple functions
3. **Follow import order** → React → External → Internal → Relative → CSS
4. **Apply TypeScript strictly** → Interfaces with `I`, Types with `T`, no `any`

### 🧩 Naming Conventions

1. **Name files consistently** → `kebab-case` for all files and directories
2. **Use proper prefixes** → `I` for interfaces, `T` for types, `View`/`Page` for components
3. **Be descriptive** → Clear, meaningful names for variables and functions
4. **Follow case patterns** → `camelCase` variables, `PascalCase` components, `UPPER_SNAKE_CASE` constants

### 🏹 Code Structure

1. **Structure components properly** → Props typing, logic separation, clean JSX
2. **Handle state correctly** → Local vs global state decisions
3. **Write clean logic** → Custom hooks for business logic, utility functions for helpers
4. **Organize imports properly** → Specific order enforced by ESLint

### 🎯 Quality Assurance

1. **Test systematically** → Behavior-focused testing, co-located test files
2. **Maintain quality** → Automated tools (ESLint, Prettier) + manual reviews
3. **Apply patterns consistently** → Same structure across all modules
4. **Ensure test coverage** → Minimum 80% coverage required for the entire project

---

## 🏗️ Implementation Patterns

### 📝 Naming Conventions

#### Naming Conventions Reference

| Type                        | Convention                   | Example                                  |
| --------------------------- | ---------------------------- | ---------------------------------------- |
| **Files and Directories**   | `kebab-case`                 | `user-profile.tsx`, `auth-service/`      |
| **Variables and Functions** | `camelCase`                  | `userName`, `handleSubmit()`             |
| **Components**              | `PascalCase`                 | `Button`, `Modal`, `Header`              |
| **Views**                   | `View + PascalCase` (prefix) | `ViewHome`, `ViewSample1`, `ViewProfile` |
| **Pages**                   | `Page + PascalCase` (prefix) | `PageHome`, `PageSample1`, `PageProfile` |
| **Interfaces**              | `I + PascalCase` (prefix)    | `IUserData`, `IButtonProps`              |
| **Types**                   | `T + PascalCase` (prefix)    | `TButtonVariant`, `TApiResponse`         |
| **Constants**               | `UPPER_SNAKE_CASE`           | `API_BASE_URL`, `MAX_ATTEMPTS`           |

### 📘 TypeScript Conventions

**No `any` allowed** - ESLint enforces strict TypeScript. Use `unknown` for dynamic content and proper type guards.

#### Interface vs Type Usage

**Use `interface` for object shapes** - Better for extending and implementing. **Use `type` for unions and complex types** - More flexible for advanced patterns.

| Use Case              | Use         | Example                                       |
| --------------------- | ----------- | --------------------------------------------- |
| **Component props**   | `interface` | `interface IButtonProps { variant?: string }` |
| **Object structures** | `interface` | `interface IUser { id: string }`              |
| **Union types**       | `type`      | `type TUserRole = 'admin' or 'user'`          |
| **Literal unions**    | `type`      | `type TVariant = 'primary' or 'secondary'`    |
| **Function types**    | `type`      | `type THandler = (id: string) => void`        |
| **Generic utilities** | `type`      | `type TApiResponse<T> = { data: T }`          |

### 🏹 Function & Component Structure

#### Import Organization

```typescript
// ✅ Correct import order (enforced by ESLint)
import React, { useState } from 'react' // 1. React first
import { create } from 'zustand' // 2. External libraries

import { Button } from '@/components/ui/button' // 3. Internal (@/)
import { useUserStore } from '@/stores/user'

import { ComponentProps } from './component.type' // 4. Relative (./)
import './component.styles.css' // 5. CSS always last
```

#### Arrow Functions (Mandatory)

```typescript
// ✅ Always use arrow functions with explicit return
const handleClick = () => {
  return console.log('clicked')
}

const Button = ({ children, onClick }: IButtonProps) => {
  return <button onClick={onClick}>{children}</button>
}

// ❌ Function declarations not allowed (ESLint error)
function handleClick() {          // ESLint error!
  console.log('clicked')
}
```

#### Component Implementation Pattern

```typescript
// ✅ Standard component structure
const Button = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false
}: IButtonProps) => {
  // 1. Custom hooks for logic
  const { isLoading } = useButtonState()

  // 2. Event handlers
  const handleClick = () => {
    if (disabled || isLoading) return
    return onClick?.()
  }

  // 3. Computed values
  const buttonClass = `btn btn-${variant} ${disabled ? 'opacity-50' : ''}`

  // 4. Return JSX
  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
```

#### Custom Hook Pattern

```typescript
// ✅ Custom hook implementation
const useUserProfile = (userId: string) => {
  // 1. State declarations
  const [profile, setProfile] = useState<IUserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 2. Effects
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true)
      try {
        const data = await userService.getProfile(userId)
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [userId])

  // 3. Actions
  const updateProfile = async (updates: Partial<IUserProfile>) => {
    setIsLoading(true)
    try {
      const updated = await userService.updateProfile(userId, updates)
      setProfile(updated)
    } finally {
      setIsLoading(false)
    }
  }

  // 4. Return interface
  return { profile, isLoading, error, updateProfile }
}
```

### 🗃️ State Management Patterns

#### React State vs Zustand Decision

| State Type              | Use React State       | Use Zustand Store        |
| ----------------------- | --------------------- | ------------------------ |
| **Form data**           | ✅ Local to component | ❌                       |
| **Modal open/close**    | ✅ UI state           | ❌                       |
| **User authentication** | ❌                    | ✅ Shared across app     |
| **Shopping cart**       | ❌                    | ✅ Persists across pages |
| **Theme preference**    | ❌                    | ✅ Global setting        |

#### React State Implementation

```typescript
// ✅ React State for component-local data
const ContactForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitForm(formData)
    } catch (error) {
      setErrors({ general: 'Submission failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form JSX */}
    </form>
  )
}
```

#### Zustand Implementation

```typescript
// ✅ Zustand for global application state
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IUserState {
  user: IUser | null
  isAuthenticated: boolean
  login: (user: IUser) => void
  logout: () => void
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      { name: 'user-storage' },
    ),
    { name: 'user-store' },
  ),
)
```

### 🧪 Testing Patterns

#### Component Testing

```typescript
// ✅ Test behavior, not implementation
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
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### Hook Testing

```typescript
// ✅ Test custom hooks
import { renderHook, act } from '@testing-library/react'
import { useUserProfile } from './user-profile.hook'

describe('useUserProfile', () => {
  it('should update profile when updateProfile is called', async () => {
    const { result } = renderHook(() => useUserProfile('user-123'))

    const newData = { name: 'John Updated' }

    await act(async () => {
      await result.current.updateProfile(newData)
    })

    expect(result.current.profile?.name).toBe('John Updated')
  })
})
```

#### Utility Testing

```typescript
// ✅ Test pure functions
import { validateEmail, formatCurrency } from './utils'

describe('Utility Functions', () => {
  it('should validate emails correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
  })

  it('should format currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })
})
```

### 🔒 Quality Enforcement

#### ESLint Enforcement

```typescript
// ✅ These patterns are enforced automatically
const handleClick = () => {
  // Arrow functions only
  return console.log('clicked') // Explicit returns
}

import React from 'react' // Import order enforced
import { external } from 'library'
import { internal } from '@/components'

// ❌ These will cause ESLint errors
function handleClick() {} // Function declaration
```

#### Prettier Formatting

```typescript
// ✅ Formatted automatically by Prettier
const complexObject = {
  property1: 'value1',
  property2: 'value2',
  nestedObject: {
    nestedProperty: 'nestedValue',
  },
}
```

#### Quality Commands

```bash
# Check code quality
npm run lint           # ESLint check
npm run format         # Prettier check
npm run tsc           # TypeScript check
npm test              # Run tests

# Fix issues automatically
npm run lint:fix       # Auto-fix ESLint issues
npm run format:fix     # Auto-format with Prettier
```

---

## ✅ Code Standards Summary

### Implementation Checklist

**For every new component/module:**

- ✅ **Use arrow functions** with explicit returns
- ✅ **Follow naming conventions** (kebab-case files, PascalCase components)
- ✅ **Apply proper prefixes** (I for interfaces, T for types)
- ✅ **Organize imports correctly** (React → External → Internal → Relative → CSS)
- ✅ **Write comprehensive tests** (behavior-focused)
- ✅ **Use TypeScript strictly** (no any, proper interfaces/types)
- ✅ **Structure code cleanly** (hooks → state → handlers → JSX)

### Standard Component Template

```typescript
// ✅ Complete component implementation template
import React, { useState } from 'react'
import { ComponentDependency } from '@/components/ui/dependency'
import { IComponentProps } from './component.type'
import { useComponentLogic } from './component.hook'

const ComponentName = ({
  prop1,
  prop2 = 'defaultValue',
  ...otherProps
}: IComponentProps) => {
  // 1. Custom hooks for logic
  const { state, actions } = useComponentLogic()

  // 2. Local state (if needed)
  const [localState, setLocalState] = useState<string>('')

  // 3. Event handlers
  const handleEvent = () => {
    return actions.doSomething()
  }

  // 4. Computed values
  const computedValue = prop1 + prop2

  // 5. Return JSX
  return (
    <div {...otherProps}>
      <ComponentDependency onClick={handleEvent}>
        {computedValue}
      </ComponentDependency>
    </div>
  )
}

export default ComponentName
```

### Key Benefits

- **🎯 Consistency** - All code follows identical patterns across the entire codebase
- **🔧 Maintainability** - Easy to understand and modify any file with predictable structure
- **⚡ Quality** - Automated tools catch issues before they reach production
- **🚀 Productivity** - Developers focus on logic, not formatting or style decisions
- **📈 Scalability** - Patterns work at any codebase size and team structure

> 💡 **Remember**: Most standards are enforced automatically by ESLint, Prettier, and TypeScript - violations are caught during development!

### Related Documentation

> 📁 **For WHERE to organize files and folders, see:** [Project Organization](./project-organization.md)

> 📚 **For complete implementation examples, see:** [Practical Examples](./examples.md)

> 🧪 **For detailed testing strategies, see:** [Testing Guide](./testing.md)
