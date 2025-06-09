# Project Organization

> 📁 **Complete guide for organizing files and folders in this template.** Learn where to place components, routes, services, and how to structure your code for scalability.

## 📋 Table of Contents

- [📁 Project Structure Overview](#-project-structure-overview)
- [📋 Development Workflow](#-development-workflow)
  - [🔥 Getting Started](#-getting-started)
  - [🧩 Adding Features](#-adding-features)
  - [🗃️ Advanced Features](#️-advanced-features)
  - [🎯 Final Steps](#-final-steps)
- [🗺️ Route Organization](#️-route-organization)
  - [📄 Page Routes](#-page-routes)
  - [🔌 API Routes](#-api-routes)
  - [🔄 Dynamic Routes](#-dynamic-routes)
  - [🔗 Route-View Integration](#-route-view-integration)
- [🏗️ Module Organization Standards](#️-module-organization-standards)
  - [📁 Standard Module Structure](#-standard-module-structure)
  - [📋 Module Examples](#-module-examples)
  - [📤 Export Examples](#-export-examples)
  - [📍 Placement Guidelines](#-placement-guidelines)
- [📂 Static Files Organization](#-static-files-organization)
- [🚀 Complete Project Example](#-complete-project-example)

---

## 📁 Project Structure Overview

This is exactly what you'll find when cloning:

```
/app
├── (routes)/                    # 🗂️ application routes
│   ├── (auth)/                  # 🔒 authenticated routes
│   │   └── .gitkeep
│   ├── api/                     # 🔌 api routes
│   │   └── .gitkeep
│   └── (public)/                # 🌐 public routes
│       ├── (home)/              # 🏠 homepage
│       │   └── page.tsx
│       ├── sample-1/            # 📄 sample page 1
│       │   └── page.tsx
│       └── layout.tsx
├── components/                  # 🧩 reusable components
│   ├── structure/               # 🏗️ structural components
│   │   └── .gitkeep
│   └── ui/                      # 🎨 interface components
│       └── .gitkeep
├── constants/                   # 📊 application constants
│   └── .gitkeep
├── hooks/                       # 🎣 custom hooks
│   └── .gitkeep
├── services/                    # 🔧 services and apis
│   └── .gitkeep
├── stores/                      # 🗃️ state stores
│   └── .gitkeep
├── styles/                      # 🎨 global styles
│   └── globals.css
├── typings/                     # 📝 global types
│   └── .gitkeep
├── utils/                       # 🛠️ utility functions
│   └── .gitkeep
├── views/                       # 📱 views/page structures
│   ├── home/                    # 🏠 homepage
│   │   ├── home.test.tsx
│   │   ├── home.tsx
│   │   └── index.ts
│   └── sample-1/                # 📄 sample page 1
│       ├── index.ts
│       ├── sample-1.test.tsx
│       └── sample-1.tsx
├── favicon.ico
└── layout.tsx

/public/                         # 📁 static files
└── .gitkeep
```

> 📝 **About `.gitkeep` files**: These are conventional files to keep empty folders in Git. Remove them when you start adding real content to the folders.

---

## 📋 Development Workflow

**Step-by-step guide for building your application:**

### 🔥 Getting Started

1. **Create new page** → `/app/(routes)/(public)/your-page-name/page.tsx`
2. **Add data fetching** → `/app/(routes)/(public)/your-page-name/query.ts` (if needed)
3. **Build page structure** → `/views/your-view-name/`

### 🧩 Adding Features

4. **Need reusable UI?** → `/components/ui/button/`
5. **Need structural component?** → `/components/structure/header/`
6. **Need business domain services?** → `/services/auth/`

### 🗃️ Advanced Features

7. **Need global state?** → `/stores/user/`
8. **Need utility functions?** → `/utils/format-date/` (global) or `[module].util.ts` (specific)
9. **Need custom hooks?** → `/hooks/use-api/` (global) or `[module].hook.ts` (specific)
10. **Need constants?** → `/constants/` (global) or `[module].const.ts` (specific)
11. **Need API integration?** → `/services/auth/` (global) or `[module].service.ts` (specific)
12. **Need type definitions?** → `/typings/` (global) or `[module].type.ts` (specific)

### 🎯 Final Steps

- **Organize static files** → `/public/images/`, `/public/documents/`
- **Remove `.gitkeep`** as you use the folders

---

## 🗺️ Route Organization

**Route folders** follow Next.js App Router conventions:

### 📄 Page Routes

```
your-page-name/
├── page.tsx                     # main page component (required)
├── layout.tsx                   # page layout (optional)
├── loading.tsx                  # loading UI (optional)
├── error.tsx                    # error UI (optional)
├── not-found.tsx                # 404 UI (optional)
└── query.ts                     # data fetching logic (optional)
```

**Example:**

```
user-profile/
├── page.tsx                     # main page component
├── layout.tsx                   # page layout
├── loading.tsx                  # loading UI
├── error.tsx                    # error UI
├── not-found.tsx                # 404 UI
└── query.ts                     # data fetching logic
```

### 🔌 API Routes

```
your-api-endpoint/
└── route.ts                     # API handler (GET, POST, PUT, DELETE, etc.)
```

**Example:**

```
api/users/
└── route.ts                     # handles /api/users requests
```

### 🔄 Dynamic Routes

```
[param]/
├── page.tsx                     # captures dynamic segments
└── query.ts                     # receives params object
```

**Examples:**

```
user/[id]/
├── page.tsx                     # /user/123, /user/456
└── query.ts                     # params.id = "123"

products/[category]/[slug]/
├── page.tsx                     # /products/electronics/phone
└── query.ts                     # params.category, params.slug

api/users/[id]/
└── route.ts                     # /api/users/123
```

📚 **Learn more about Next.js routing:** [App Router - Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

### 🔗 Route-View Integration

The route structure has direct correspondence with views, and queries stay with the routes:

| Route                                     | View                              | Query               | Type             |
| ----------------------------------------- | --------------------------------- | ------------------- | ---------------- |
| `app/(routes)/(public)/(home)/page.tsx`   | `views/home/` → `ViewHome`        | `(home)/query.ts`   | 🌐 Public        |
| `app/(routes)/(public)/sample-1/page.tsx` | `views/sample-1/` → `ViewSample1` | `sample-1/query.ts` | 🌐 Public        |
| `app/(routes)/(auth)/sample-3/page.tsx`   | `views/sample-3/` → `ViewSample3` | `sample-3/query.ts` | 🔒 Authenticated |

**Pattern:**

```
(routes)/[group]/[sample]/page.tsx    →  views/[sample]/  →  View[Sample]
(routes)/[group]/[sample]/query.ts    →  Route-specific queries
```

---

## 🏗️ Module Organization Standards

**All application modules** (components, services, stores, hooks, utils, views) follow a standard structure for consistency:

> 📖 **For detailed naming conventions and code standards, see:** [Code Standards](./code-standards.md)

### 📁 Standard Module Structure

```
[module-name]/
├── [module-name].test.tsx       # 🧪 unit tests
├── [module-name].tsx            # 📄 main file
├── [module-name].type.ts        # 📝 specific types
├── [module-name].hook.ts        # 🎣 specific hook (optional)
├── [module-name].const.ts       # 📊 module constants (optional)
├── [module-name].service.ts     # 🔧 module services (optional)
├── [module-name].util.ts        # 🛠️ module utilities (optional)
└── index.ts                     # 📤 export file
```

> 🧪 **For detailed testing strategies and patterns, see:** [Testing Guide](./testing.md)

This structure applies to:

- 🧩 **components/** (button, modal, card)
- 📱 **views/** (home, profile, dashboard)
- 🔧 **services/** (auth, api, payment)
- 🗃️ **stores/** (user, cart, theme)
- 🎣 **hooks/** (use-api, use-debounce)
- 🛠️ **utils/** (format-date, validate)

### 📋 Module Examples

#### 🧩 Component Module

```
button/
├── button.test.tsx              # 🧪 unit tests
├── button.tsx                   # 📄 react component
├── button.type.ts               # 📝 IButtonProps, TButtonVariant
├── button.hook.ts               # 🎣 useButton (optional)
├── button.const.ts              # 📊 BUTTON_VARIANTS, BUTTON_SIZES (optional)
├── button.service.ts            # 🔧 button API calls (optional)
├── button.util.ts               # 🛠️ button helpers (optional)
└── index.ts                     # 📤 exports
```

#### 🔧 Service Module

```
auth/
├── auth.test.ts                 # 🧪 service tests
├── auth.ts                      # 📄 authentication logic
├── auth.type.ts                 # 📝 IAuthResponse, TAuthStatus
├── auth.hook.ts                 # 🎣 useAuth (optional)
├── auth.const.ts                # 📊 AUTH_ENDPOINTS, TOKEN_EXPIRY (optional)
├── auth.util.ts                 # 🛠️ auth helpers (optional)
└── index.ts                     # 📤 exports
```

#### 🗃️ Store Module

```
user/
├── user.test.ts                 # 🧪 store tests
├── user.ts                      # 📄 zustand store
├── user.type.ts                 # 📝 IUserState, TUserActions
├── user.hook.ts                 # 🎣 useUserSelector (optional)
├── user.const.ts                # 📊 USER_ROLES, DEFAULT_USER (optional)
├── user.service.ts              # 🔧 user API calls (optional)
├── user.util.ts                 # 🛠️ user transformations (optional)
└── index.ts                     # 📤 exports
```

#### 🎣 Hook Module

```
use-api/
├── use-api.test.ts              # 🧪 hook tests
├── use-api.ts                   # 📄 custom hook
├── use-api.type.ts              # 📝 hook types
├── use-api.const.ts             # 📊 API_ENDPOINTS, DEFAULT_CONFIG (optional)
├── use-api.util.ts              # 🛠️ API helpers (optional)
└── index.ts                     # 📤 exports
```

#### 🛠️ Utils Module

```
format-date/
├── format-date.test.ts          # 🧪 utility tests
├── format-date.ts               # 📄 utility functions
├── format-date.type.ts          # 📝 utility types
├── format-date.const.ts         # 📊 DATE_FORMATS, LOCALES (optional)
└── index.ts                     # 📤 exports
```

#### 📱 View Module (with internal components)

```
home/
├── components/                  # 🧩 view-internal components
│   └── hero-section/
│       ├── hero-section.test.tsx
│       ├── hero-section.tsx
│       ├── hero-section.type.ts
│       ├── hero-section.hook.ts # 🎣 specific hook (optional)
│       ├── hero-section.const.ts # 📊 component constants (optional)
│       ├── hero-section.service.ts # 🔧 API calls (optional)
│       ├── hero-section.util.ts # 🛠️ helpers (optional)
│       └── index.ts
├── home.test.tsx                # 🧪 unit tests
├── home.tsx                     # 📄 main view
├── home.type.ts                 # 📝 specific types
├── home.hook.ts                 # 🎣 specific hook (optional)
├── home.const.ts                # 📊 view constants (optional)
├── home.service.ts              # 🔧 view API calls (optional)
├── home.util.ts                 # 🛠️ view helpers (optional)
└── index.ts                     # 📤 export file
```

### 📤 Export Examples

**Standard export pattern:**

```typescript
// components/ui/button/index.ts
export { Button } from './button'
export { useButton } from './button.hook'
export { BUTTON_VARIANTS } from './button.const'
export type { IButtonProps, TButtonVariant } from './button.type'
```

### 📍 Placement Guidelines

#### 🧩 Components

| Use `/components/ui/`      | Use `/components/structure/`  | Use `/views/[view]/components/` |
| -------------------------- | ----------------------------- | ------------------------------- |
| ✅ Reusable across app     | ✅ App structural elements    | ✅ Specific to one view only    |
| ✅ Design system elements  | ✅ Headers, footers, sidebars | ✅ Complex view-internal logic  |
| ✅ Buttons, inputs, modals | ✅ Navigation components      | ✅ Not reusable elsewhere       |

#### 🎣 Custom Hooks

> 📝 **For detailed custom hooks strategy, see:** [Code Standards](./code-standards.md)

| Use `/hooks/` (Global) | Use `[module-name].hook.ts` (Specific) |
| ---------------------- | -------------------------------------- |
| ✅ Reusable across app | ✅ Specific to one module only         |
| ✅ Used in 3+ places   | ✅ Business logic encapsulation        |

#### 📊 Constants

> 📝 **For detailed constants strategy, see:** [Code Standards](./code-standards.md)

| Use `/constants/` (Global) | Use `[module-name].const.ts` (Specific) |
| -------------------------- | --------------------------------------- |
| ✅ Shared across app       | ✅ Module-specific values               |
| ✅ App configurations      | ✅ Component variants/sizes             |

#### 🗃️ State Management

> 📝 **For detailed state management patterns, see:** [Code Standards](./code-standards.md)

| Use React State          | Use Zustand (`/stores/`)    |
| ------------------------ | --------------------------- |
| ✅ Component local state | ✅ Global application state |
| ✅ Form data, UI state   | ✅ Persisted data           |

#### 🔧 Services

> 📝 **For detailed service patterns, see:** [Code Standards](./code-standards.md)

| Use `/services/[domain]/`   | Use `[module-name].service.ts` (Specific) |
| --------------------------- | ----------------------------------------- |
| ✅ Business domain services | ✅ Module-specific API calls              |
| ✅ Reusable across app      | ✅ Component data fetching                |

#### 🛠️ Utils

> 📝 **For detailed utilities patterns, see:** [Code Standards](./code-standards.md)

| Use `/utils/[utility]/` | Use `[module-name].util.ts` (Specific) |
| ----------------------- | -------------------------------------- |
| ✅ Reusable across app  | ✅ Module-specific helpers             |
| ✅ Used in 3+ places    | ✅ Single-use calculations             |

#### 📝 Types

> 📝 **For detailed TypeScript patterns, see:** [Code Standards](./code-standards.md)

| Use `/typings/` (Global) | Use `[module-name].type.ts` (Specific) |
| ------------------------ | -------------------------------------- |
| ✅ Shared across app     | ✅ Module-specific interfaces          |
| ✅ API response types    | ✅ Component props                     |

#### 🎨 Styles

| Use `/styles/` (Global) | Component-specific (Tailwind) |
| ----------------------- | ----------------------------- |
| ✅ Global CSS variables | ✅ Component styling          |
| ✅ Base styles, themes  | ✅ Utility classes            |

---

## 📂 Static Files Organization

When you need to add static files, organize like this:

```
/public/
├── documents/     # pdfs, downloads
├── images/        # photos and images
├── robots.txt     # seo
└── sitemap.xml    # seo
```

> 📝 **Note**: In App Router, the default `favicon.ico` goes in `/app/favicon.ico`. The current `.gitkeep` file in `/public/` should be removed when adding real content.

---

## 🚀 Complete Project Example

This is a **reference example** for when the project is more complete:

```
/app
├── (routes)/                     # 🗂️ application routes
│   ├── api/                      # 🔌 api routes
│   │   └── example/
│   │       └── route.ts
│   ├── (auth)/                   # 🔒 authenticated routes
│   │   ├── sample-3/             # 📄 sample page 3 (requires auth)
│   │   │   ├── page.tsx
│   │   │   └── query.ts
│   │   └── layout.tsx
│   └── (public)/                 # 🌐 public routes
│       ├── (home)/               # 🏠 homepage
│       │   ├── error.tsx
│       │   ├── loading.tsx
│       │   ├── page.tsx
│       │   └── query.ts
│       ├── sample-1/             # 📄 sample page 1
│       │   ├── page.tsx
│       │   └── query.ts
│       └── layout.tsx
├── components/                   # 🧩 reusable components
│   ├── structure/                # 🏗️ structural components
│   │   ├── footer/
│   │   ├── header/
│   │   └── sidebar/
│   └── ui/                       # 🎨 interface components
│       ├── button/
│       │   ├── button.test.tsx
│       │   ├── button.tsx
│       │   ├── button.type.ts
│       │   ├── button.hook.ts
│       │   ├── button.const.ts
│       │   ├── button.service.ts
│       │   ├── button.util.ts
│       │   └── index.ts
│       ├── input/
│       └── modal/
├── constants/                    # 📊 application constants
├── hooks/                        # 🎣 custom hooks
│   ├── use-api/
│   │   ├── use-api.test.ts
│   │   ├── use-api.ts
│   │   ├── use-api.type.ts
│   │   ├── use-api.const.ts
│   │   ├── use-api.util.ts
│   │   └── index.ts
│   └── use-local-storage/
├── services/                     # 🔧 services and apis
│   ├── auth/
│   │   ├── auth.test.ts
│   │   ├── auth.ts
│   │   ├── auth.type.ts
│   │   ├── auth.hook.ts
│   │   ├── auth.const.ts
│   │   ├── auth.util.ts
│   │   └── index.ts
│   └── api/
├── stores/                       # 🗃️ state stores
│   └── user/
│       ├── user.test.ts
│       ├── user.ts
│       ├── user.type.ts
│       ├── user.hook.ts
│       ├── user.const.ts
│       ├── user.service.ts
│       ├── user.util.ts
│       └── index.ts
├── styles/                       # 🎨 global styles
├── typings/                      # 📝 global types
├── utils/                        # 🛠️ utility functions
│   └── format-date/
│       ├── format-date.test.ts
│       ├── format-date.ts
│       ├── format-date.type.ts
│       ├── format-date.const.ts
│       └── index.ts
├── views/                        # 📱 views/page structures
│   ├── home/                     # 🏠 homepage
│   │   ├── components/
│   │   │   └── hero-section/
│   │   │       ├── hero-section.test.tsx
│   │   │       ├── hero-section.tsx
│   │   │       ├── hero-section.type.ts
│   │   │       ├── hero-section.hook.ts
│   │   │       ├── hero-section.const.ts
│   │   │       ├── hero-section.service.ts
│   │   │       ├── hero-section.util.ts
│   │   │       └── index.ts
│   │   ├── home.test.tsx
│   │   ├── home.tsx
│   │   ├── home.type.ts
│   │   ├── home.hook.ts
│   │   ├── home.const.ts
│   │   ├── home.service.ts
│   │   ├── home.util.ts
│   │   └── index.ts
│   ├── sample-1/                 # 📄 sample page 1
│   └── sample-3/                 # 📄 sample page 3 (requires auth)
├── favicon.ico
└── layout.tsx

/public/                          # 📁 static files
├── documents/
├── images/
├── robots.txt
└── sitemap.xml
```

📚 **Learn more about Next.js project organization:** [App Router Documentation](https://nextjs.org/docs/app)
