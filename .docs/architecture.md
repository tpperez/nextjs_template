# Architecture & Concepts

## 🏗️ Architectural Overview

This template follows a **layered architecture** with clear separation of concerns, designed for scalability and maintainability. Each layer has specific responsibilities and well-defined interfaces.

```
┌─────────────────────────────────────────┐
│                Routes                   │ ← Server Components
│           (pages/layout)                │   (Data fetching)
├─────────────────────────────────────────┤
│                Queries                  │ ← Server-side data fetching
│           (route-specific)              │   (API calls, DB queries)
├─────────────────────────────────────────┤
│                Views                    │ ← Page structures
│        (page orchestration)             │   (Business logic)
├─────────────────────────────────────────┤
│              Components                 │ ← Reusable UI elements
│        (UI building blocks)             │   (Presentation logic)
├─────────────────────────────────────────┤
│         Services & Stores               │ ← Data & state management
│      (global state, API integration)    │   (Side effects)
├─────────────────────────────────────────┤
│            Utils & Hooks                │ ← Shared utilities
│         (pure functions, logic)         │   (Helper functions)
└─────────────────────────────────────────┘
```

---

## 🧩 Components vs Views

### **Components** (`/components/`)

- 🔄 **Reusable** across multiple parts of the application
- 🎯 **Single responsibility** (button, input, modal)
- 🧩 **Testable in isolation**
- 📦 **No complex business logic**
- 🎨 **Focus on presentation**

### **Views** (`/views/`)

- 📱 **Specific to one page/screen**
- 🎭 **Orchestrate multiple components**
- 🧠 **Contain business logic**
- 📊 **Receive data via props** (don't fetch data directly)
- 🏗️ **Page structure and layout**

### **Queries** (`/routes/.../queries.ts`)

- 🔍 **Specific to one route/page**
- 📡 **Make API calls**
- 🏗️ **Prepare data for views**
- ⚡ **Server Components** (execute on server)
- 🔧 **Data transformation and validation**

---

## 🔄 Data Flow: Route → Query → View

```typescript
// 1. Route (Server Component) - Fetches data
const PageHome = async () => {
  const data = await getHomeData()  // Query
  return <ViewHome data={data} />   // Pass to View
}

// 2. Query - Abstracts API calls
const getHomeData = async () => {
  return await fetch('/api/home').then(r => r.json())
}

// 3. View - Renders with the data
const ViewHome = ({ data }) => {
  return <div>{data.title}</div>
}
```

**Benefits of this separation:**

- ✅ **Testable views** - Direct props, no side effects
- ✅ **Reusable queries** - Can be called from other places
- ✅ **Server Components** - Queries execute on server
- ✅ **Type Safety** - Typed data flows from query to view
- ✅ **Maintenance** - Well-defined responsibilities

---

## 🗺️ Route → View → Query Mapping

The route structure has direct correspondence with views, and queries stay with the routes:

| Route                                     | View                              | Query                 | Type             |
| ----------------------------------------- | --------------------------------- | --------------------- | ---------------- |
| `app/(routes)/(public)/(home)/page.tsx`   | `views/home/` → `ViewHome`        | `(home)/queries.ts`   | 🌐 Public        |
| `app/(routes)/(public)/sample-1/page.tsx` | `views/sample-1/` → `ViewSample1` | `sample-1/queries.ts` | 🌐 Public        |
| `app/(routes)/(public)/sample-2/page.tsx` | `views/sample-2/` → `ViewSample2` | `sample-2/queries.ts` | 🌐 Public        |
| `app/(routes)/(auth)/sample-3/page.tsx`   | `views/sample-3/` → `ViewSample3` | `sample-3/queries.ts` | 🔒 Authenticated |
| `app/(routes)/(auth)/sample-4/page.tsx`   | `views/sample-4/` → `ViewSample4` | `sample-4/queries.ts` | 🔒 Authenticated |

**Pattern:**

```
(routes)/[group]/[sample]/page.tsx    →  views/[sample]/  →  View[Sample]
(routes)/[group]/[sample]/queries.ts  →  Route-specific queries
```

---

## 🏗️ Component Hierarchy

### 1. **Structure Components** (`/components/structure/`)

- Application structural components
- Headers, Footers, Sidebars, etc.
- Layout and navigation elements

### 2. **UI Components** (`/components/ui/`)

- Reusable interface components
- Buttons, Inputs, Modals, etc.
- Design system building blocks

### 3. **Views** (`/views/`)

- Complete page structures
- Business logic and orchestration
- Component composition to form screens

### 4. **Queries** (`/routes/.../queries.ts`)

- Route-specific
- API calls and data preparation

---

## 🤔 When to Use Each Approach

| Scenario                | Use Component                      | Use View                              |
| ----------------------- | ---------------------------------- | ------------------------------------- |
| **Reusable button**     | ✅ `/components/ui/button/`        | ❌                                    |
| **Confirmation modal**  | ✅ `/components/ui/modal/`         | ❌                                    |
| **App header**          | ✅ `/components/structure/header/` | ❌                                    |
| **Homepage**            | ❌                                 | ✅ `/views/home/` → `ViewHome`        |
| **Sample pages**        | ❌                                 | ✅ `/views/sample-1/` → `ViewSample1` |
|                         | ❌                                 | ✅ `/views/sample-2/` → `ViewSample2` |
| **Authenticated pages** | ❌                                 | ✅ `/views/sample-3/` → `ViewSample3` |
|                         | ❌                                 | ✅ `/views/sample-4/` → `ViewSample4` |

---

## 🛠 Technologies Used

### Core Stack

- **Next.js** - Full-stack React framework with SSR/SSG
- **React** - Library for building user interfaces
- **TypeScript** - JavaScript with static typing
- **Tailwind CSS** - Utility-first CSS framework

### State & Data Management

- **React State** - Native hooks (useState, useReducer) for **component local state**
- **Zustand** - **Global state** management in `/stores/` directory (defined standard)

> 💡 **Usage pattern**: React state for local/component state, Zustand **exclusively** for global state in `/stores/` directory.

### Development & Quality

- **ESLint** - Code linter for quality
- **Prettier** - Automatic code formatter
- **Jest** - Unit testing framework
- **Testing Library** - Utilities for React component testing

### Tooling

- **Husky** - Git hooks for automation
- **Commitizen** - Conventional commits standardization
- **Turbopack** - Fast Next.js bundler

> 📦 **Specific versions**: Check the `package.json` file for exact versions of all dependencies. The template includes only essential dependencies - others can be added as needed.

---

## 🗃️ State Management Strategy

### Local State (React Hooks)

Use for component-specific state that doesn't need to be shared:

```typescript
// ✅ Component local state
const UserForm = () => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Component logic here
}
```

### Global State (Zustand)

Use for application-wide state that multiple components need:

```typescript
// ✅ Global state store
// /stores/user/user.ts
import { create } from 'zustand'

interface IUserState {
  user: IUser | null
  isAuthenticated: boolean
  login: (user: IUser) => void
  logout: () => void
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
```

### When to Use Which

| State Type              | Use React State       | Use Zustand              |
| ----------------------- | --------------------- | ------------------------ |
| **Form data**           | ✅ Local to component | ❌                       |
| **Modal open/close**    | ✅ UI state           | ❌                       |
| **User authentication** | ❌                    | ✅ Shared across app     |
| **Shopping cart**       | ❌                    | ✅ Persists across pages |
| **Theme preference**    | ❌                    | ✅ Global setting        |
| **Loading states**      | ✅ Component-specific | ❌ Unless shared         |

---

## 🔌 Service Architecture

Services handle external integrations and complex business logic:

```typescript
// /services/auth/auth.ts
export const authService = {
  login: async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    // Authentication logic
  },

  logout: async (): Promise<void> => {
    // Logout logic
  },

  refreshToken: async (token: string): Promise<string> => {
    // Token refresh logic
  },
}
```

### Service Responsibilities

- 🌐 **API integrations** - HTTP calls, data transformation
- 🔐 **Authentication** - Login, logout, token management
- 💾 **Data persistence** - Local storage, cookies
- 📧 **External services** - Email, notifications, analytics
- 🧮 **Complex calculations** - Business logic that's reusable

---

## 🎣 Hook Strategy

### Global Hooks (`/hooks/`)

For logic reused across multiple components:

```typescript
// /hooks/use-api/use-api.ts
export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generic API logic

  return { data, loading, error, refetch }
}
```

### Specific Hooks (`.hook.ts` files)

For component/view-specific logic:

```typescript
// /views/user-profile/user-profile.hook.ts
export const useUserProfile = (userId: string) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // User profile specific logic

  return { profile, isEditing, startEditing, saveProfile }
}
```

---

## 📝 Type System Architecture

### Interface vs Type Guidelines

```typescript
// ✅ Interfaces for object structures
interface IUser {
  id: string
  name: string
  email: string
  role: TUserRole
}

// ✅ Types for unions and utilities
type TUserRole = 'admin' | 'user' | 'guest'
type TApiResponse<T> = {
  data: T
  success: boolean
  message?: string
}

// ✅ Utility types for consistency
type TWithId<T> = T & { id: string }
type TOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

### Type Organization

- **Global types** → `/typings/`
- **Module-specific types** → `[module].type.ts`
- **API types** → `/services/[service]/[service].type.ts`
- **Component types** → `/components/[component]/[component].type.ts`

---

## 🔒 Security Architecture

### Environment Variables

```env
# Public (browser-accessible) - MUST start with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_APP_NAME="My App"

# Private (server-only) - NO prefix
MY_SECRET_KEY="your-secret-here"
MY_DATABASE_URL="your-database-connection"
```

### Content Security Policy

The template includes CSP configuration in `middleware.ts`:

```typescript
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
```

---

## 📱 Responsive Design Strategy

### Tailwind CSS Approach

```typescript
// ✅ Mobile-first responsive design
<div className="
  w-full p-4
  md:w-1/2 md:p-6
  lg:w-1/3 lg:p-8
  xl:w-1/4
">
  Content
</div>

// ✅ Component-based responsive patterns
const ResponsiveGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
)
```

### Breakpoint Strategy

- **Mobile** (default) - No prefix
- **Tablet** (`md:`) - 768px and up
- **Desktop** (`lg:`) - 1024px and up
- **Large Desktop** (`xl:`) - 1280px and up

---

## 🧪 Testing Architecture

### Testing Strategy

```typescript
// Unit tests for components
// /components/ui/button/button.test.tsx
describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})

// Integration tests for views
// /views/home/home.test.tsx
describe('ViewHome', () => {
  it('should display welcome message', () => {
    render(<ViewHome />)
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })
})

// Unit tests for services
// /services/auth/auth.test.ts
describe('authService', () => {
  it('should login successfully', async () => {
    const result = await authService.login(credentials)
    expect(result.user).toBeDefined()
  })
})
```

### Test Organization

- **Component tests** → Co-located with components
- **View tests** → Co-located with views
- **Service tests** → Co-located with services
- **Integration tests** → `/tests/` directory (when needed)
- **E2E tests** → Separate repository or `/e2e/` directory

---

## 🚀 Performance Architecture

### Code Splitting Strategy

```typescript
// ✅ Route-based code splitting (automatic with App Router)
// Each page.tsx is automatically code-split

// ✅ Component-based code splitting (when needed)
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-side only if needed
})
```

### Image Optimization

```typescript
// ✅ Next.js Image optimization
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // For above-the-fold images
  placeholder="blur"
/>
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

---

## ✅ Architecture Benefits

### **Scalability**

- Clear separation allows teams to work on different layers
- Each layer can scale independently
- New features follow established patterns

### **Maintainability**

- Easy to locate and modify specific functionality
- Changes in one layer rarely affect others
- Consistent patterns across the entire application

### **Testability**

- Each layer can be tested in isolation
- Pure functions and clear interfaces make testing easier
- Mocking is straightforward with well-defined boundaries

### **Developer Experience**

- New developers can quickly understand the structure
- Code is predictable and follows established conventions
- IDE support works better with consistent patterns

### **Performance**

- Server Components reduce client bundle size
- Code splitting happens naturally at the route level
- State management is optimized for the use case
