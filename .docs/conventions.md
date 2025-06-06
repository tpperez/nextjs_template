# Code Conventions

## 🏷️ Naming Conventions

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

### 🎯 Examples

```typescript
// ✅ Correct
const userAge = 25
const handleUserLogin = () => {
  return // logic here
}
const UserDashboard = () => {
  return <div>Dashboard</div>
}

// Interfaces (for object structures)
interface IUserData {
  id: string
  name: string
  email: string
}

interface IButtonProps {
  variant?: TButtonVariant
  children: React.ReactNode
}

// Types (for unions, primitives, utilities)
type TButtonVariant = 'primary' | 'secondary' | 'danger'
type TSize = 'sm' | 'md' | 'lg'
type TStatus = 'loading' | 'success' | 'error'
type TTheme = 'light' | 'dark'

const MAX_RETRY_ATTEMPTS = 3

// ❌ Incorrect
const user_age = 25                    // snake_case
function HandleUserLogin() {}          // function declaration
const userDashboard = () => {}         // camelCase for component
interface ButtonProps {}              // no I prefix
type UserData = {}                     // type for structure (use interface)
```

---

## 🏹 Arrow Functions (Mandatory)

This project uses **exclusively arrow functions** as configured in ESLint:

```typescript
// ✅ Correct - Arrow functions with explicit return
const handleClick = () => {
  return console.log('clicked')
}

const Button = ({ children }: IButtonProps) => {
  return <button>{children}</button>
}

// ❌ Incorrect - Function declarations not allowed
function handleClick() {          // ESLint error!
  console.log('clicked')
}

function Button(props) {          // ESLint error!
  return <button>{props.children}</button>
}
```

---

## 🎣 Custom Hooks (Recommended)

Use custom hooks to abstract logic, business rules, and state management whenever possible.

### 📁 Custom Hook Organization

**Global hooks** - Reusable throughout the application:

```
/app/hooks/
├── use-api.hook.ts              # Generic hook for API calls
├── use-local-storage.hook.ts    # Hook for localStorage
└── use-debounce.hook.ts         # Hook for debounce
```

**Specific hooks** - Used only in one scope (view/component):

```
/app/views/user-profile/
├── user-profile.tsx
├── user-profile.test.tsx
├── user-profile.hook.ts         # ✅ View-specific hook
└── index.ts

/app/components/ui/data-table/
├── data-table.tsx
├── data-table.test.tsx
├── data-table.hook.ts           # ✅ Component-specific hook
└── index.ts
```

### 🔍 Naming Convention

```typescript
// ✅ Global hooks (in /hooks/)
export const useApi = () => {
  /* ... */
}
export const useLocalStorage = () => {
  /* ... */
}
export const useDebounce = () => {
  /* ... */
}

// ✅ Specific hooks (with .hook. suffix)
export const useUserProfile = () => {
  /* ... */
} // user-profile.hook.ts
export const useDataTable = () => {
  /* ... */
} // data-table.hook.ts
export const useFormValidation = () => {
  /* ... */
} // form-validation.hook.ts
```

### 🎯 When to Use Each Approach

| Scenario                 | Use `/hooks/` (Global)     | Use `.hook.` (Specific) |
| ------------------------ | -------------------------- | ----------------------- |
| **Reusable logic**       | ✅ API calls, localStorage | ❌                      |
| **Generic utilities**    | ✅ debounce, throttle      | ❌                      |
| **View-specific logic**  | ❌                         | ✅ user-profile.hook.ts |
| **Complex local state**  | ❌                         | ✅ data-table.hook.ts   |
| **Specific validation**  | ❌                         | ✅ contact-form.hook.ts |
| **Hooks used 3+ places** | ✅ Move to `/hooks/`       | ❌                      |

### 🎯 When to Use `.const.ts` vs `/constants/`

| Scenario                    | Use `.const.ts` (Local)         | Use `/constants/` (Global) |
| --------------------------- | ------------------------------- | -------------------------- |
| **Module constants**        | ✅ BUTTON_VARIANTS, AUTH_ERRORS | ❌                         |
| **Specific configurations** | ✅ TOKEN_CONFIG, DATE_FORMATS   | ❌                         |
| **Component CSS classes**   | ✅ BUTTON_CLASSES               | ❌                         |
| **Shared constants**        | ❌                              | ✅ API_BASE_URL            |
| **App configurations**      | ❌                              | ✅ APP_CONFIG              |
| **Globally used values**    | ❌                              | ✅ MAX_FILE_SIZE           |

> 💡 **Simple rule**: If the constant is module-specific, use `.const.ts`. If it's used in multiple modules, move to `/constants/`.

**Benefits of Custom Hooks:**

- ✅ **Reusability** - Shared logic between components
- ✅ **Testability** - Hooks can be tested in isolation
- ✅ **Separation of concerns** - Components focus only on rendering
- ✅ **Maintainability** - Logic changes centralized
- ✅ **Readability** - Cleaner and more focused components
- ✅ **Colocation** - Specific hooks close to the code that uses them

**When to create custom hooks:**

- 🔄 **Complex state** - Multiple related states
- 🧠 **Business logic** - Validations, calculations, transformations
- 🌐 **API calls** - Fetch, cache, loading states
- 🎯 **Side effects** - Subscriptions, timers, DOM manipulation
- 🔁 **Reusable logic** - Used in multiple components

---

## 🤔 When to Use Interface vs Type

| Use                   | Interface (I)        | Type (T)                 |
| --------------------- | -------------------- | ------------------------ |
| **Object structures** | ✅ `IUser`, `IProps` | ❌                       |
| **Unions/Literals**   | ❌                   | ✅ `TStatus`, `TVariant` |
| **Utilities**         | ❌                   | ✅ `TApiResponse<T>`     |
| **Extension**         | ✅ Can be extended   | ❌ Not extensible        |
| **Performance**       | ✅ Better for TS     | ⚡ Simple alias          |

### Examples

```typescript
// ✅ Use Interface for object structures
interface IUser {
  id: string
  name: string
  email: string
  role: TUserRole
}

interface IButtonProps {
  variant?: TButtonVariant
  size?: TSize
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

// ✅ Use Type for unions and utilities
type TUserRole = 'admin' | 'user' | 'guest'
type TButtonVariant = 'primary' | 'secondary' | 'danger'
type TSize = 'sm' | 'md' | 'lg'
type TApiResponse<T> = {
  data: T
  success: boolean
  message?: string
}

// ✅ Extending interfaces
interface IAdminUser extends IUser {
  permissions: string[]
  department: string
}
```

---

## 🎯 Prefix Patterns

```typescript
// ✅ Correct - Consistent prefixes (current standard)
const PageHome = () => {                        // Next.js page (arrow function)
  return <ViewHome />                           // View that structures the page
}

const ViewHome = () => {                        // Main view (arrow function)
  return (
    <div>
      <Header />                                // Reusable component
      <Button variant="primary" />              // UI component
    </div>
  )
}

// ❌ Incorrect - Function declarations
export default function Home() {                // Function declaration (don't use)
  return <ViewHome />                          // Confusing: same name as page
}
```

---

## 📂 Import Organization

```typescript
// ✅ Correct import order
import React from 'react' // 1. React always first
import { create } from 'zustand' // 2. External libraries (node_modules)

import { Button } from '@/components/ui/button' // 3. Internal imports (absolute @/)
import { Header } from '@/components/structure/header'
import { useUserStore } from '@/stores/user.store'

import { ComponentProps } from './component.type' // 4. Relative imports (./ or ../)
import './component.styles.css' // 5. CSS/Styles always last

// ❌ Incorrect order
import './styles.css' // CSS in the middle
import React from 'react' // React after others
import { Button } from '@/components/ui/button'
import { create } from 'zustand' // External after internal
```

**Organization rules:**

1. **React** always first
2. **External libraries** (node_modules)
3. **Internal imports** with absolute path (@/)
4. **Relative imports** (./ or ../)
5. **CSS/Styles** always last

---

## 📝 TypeScript Best Practices

### Constants with Type Safety

```typescript
// ✅ Use 'as const' for type safety
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

// ✅ Type inference from constants
type TButtonVariant = keyof typeof BUTTON_VARIANTS // 'PRIMARY' | 'SECONDARY' | 'DANGER'
type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES] // 'admin' | 'user' | 'guest'

// ❌ Without 'as const' - loses literal types
export const BUTTON_VARIANTS_BAD = {
  PRIMARY: 'primary', // Type: string (not 'primary')
  SECONDARY: 'secondary', // Type: string (not 'secondary')
}
```

### Strict Type Checking

```typescript
// ✅ Enable strict mode in component props
interface IStrictComponentProps {
  // Required props - no optional unless truly optional
  title: string
  onSubmit: (data: IFormData) => void

  // Optional props - use sparingly
  className?: string
  disabled?: boolean
}

// ✅ Use discriminated unions for complex states
type TLoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: string }

// ✅ Avoid 'any' - use unknown or specific types
const handleApiResponse = (response: unknown) => {
  // Use type guards instead of 'any'
  if (typeof response === 'object' && response !== null) {
    // Safe to access properties
  }
}
```

---

## ✅ Benefits of Following These Conventions

### **Consistency**

- Every team member knows exactly where to find things
- New developers can quickly understand the codebase
- Code reviews become faster and more focused

### **Maintainability**

- Changes are easier to make and track
- Refactoring becomes safer with consistent patterns
- Dependencies are clear and well-organized

### **Scalability**

- Structure supports growth without major refactoring
- Patterns can be replicated across any part of the application
- Architecture remains clean as the project evolves

### **Quality**

- TypeScript enforces type safety throughout
- ESLint/Prettier ensure consistent code style
- Testing is easier with predictable structure

### **Developer Experience**

- Autocomplete works better with consistent naming
- File navigation is intuitive
- Less cognitive load when switching between modules

> 💡 **Remember**: These conventions are enforced by ESLint configuration, so most violations will be caught automatically during development.
