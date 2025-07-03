# Project Organization

> 📁 **Complete guide for organizing files and folders in this template.** Learn where to place components, routes, services, and how to structure your code for scalability.

## 📋 Table of Contents

- [📁 Project Structure Overview](#-project-structure-overview)
- [🏗️ Architectural Overview](#️-architectural-overview)
- [📋 Development Workflow](#-development-workflow)
  - [🔥 Getting Started](#-getting-started)
  - [🧩 Adding Features](#-adding-features)
  - [🗃️ Advanced Features](#️-advanced-features)
  - [🎯 Final Steps](#-final-steps)
- [📂 Static Files Organization](#-static-files-organization)
- [🗺️ Route Organization](#️-route-organization)
  - [📄 Page Routes](#-page-routes)
  - [🔌 API Routes](#-api-routes)
  - [🔄 Dynamic Routes](#-dynamic-routes)
  - [🔗 Route-View Integration](#-route-view-integration)
- [🏗️ Module Organization Standards](#️-module-organization-standards)
  - [📁 Standard Module Structure](#-standard-module-structure)
  - [📋 Real Module Examples](#-real-module-examples)
  - [📤 Export Examples](#-export-examples)
  - [📍 Placement Guidelines](#-placement-guidelines)
- [🚀 Complete Project Example](#-complete-project-example)

---

## 📁 Project Structure Overview

This is the **current implemented structure** of the project:

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
│       ├── pokemons/            # 📄 pokemon gallery & detail
│       │   ├── [name]/          # 🔄 dynamic pokemon detail
│       │   │   ├── page.tsx
│       │   │   ├── not-found.tsx
│       │   │   └── query/
│       │   │       ├── index.ts
│       │   │       ├── query.ts
│       │   │       └── query.type.ts
│       │   ├── page.tsx
│       │   └── query/
│       │       ├── index.ts
│       │       ├── query.const.ts
│       │       ├── query.ts
│       │       └── query.type.ts
│       └── layout.tsx
├── components/                  # 🧩 reusable components
│   ├── structure/               # 🏗️ structural components
│   │   └── .gitkeep
│   └── ui/                      # 🎨 interface components
│       └── spinner/             # ✨ loading spinner component
│           ├── index.ts
│           ├── spinner.const.ts
│           ├── spinner.tsx
│           └── spinner.type.ts
├── constants/                   # 📊 application constants
│   └── .gitkeep
├── hooks/                       # 🎣 custom hooks
│   └── .gitkeep
├── services/                    # 🔧 services and apis
│   ├── http/                    # 📡 HTTP clients (REST + GraphQL)
│   │   ├── core/                # 🎯 configuration and adapters
│   │   │   ├── core.ts
│   │   │   ├── core.type.ts
│   │   │   ├── core.utils.ts
│   │   │   └── index.ts
│   │   ├── graphql/             # 📊 GraphQL client
│   │   │   ├── adapters/
│   │   │   │   ├── fetch-graphql.ts
│   │   │   │   ├── graphql-request.ts
│   │   │   │   └── index.ts
│   │   │   ├── graphql.ts
│   │   │   ├── graphql.type.ts
│   │   │   └── index.ts
│   │   ├── providers/           # 🎛️ React Query provider
│   │   │   ├── react-query.tsx
│   │   │   └── index.ts
│   │   ├── rest/                # 🌐 REST client
│   │   │   ├── adapters/
│   │   │   │   ├── axios-rest.ts
│   │   │   │   ├── fetch-rest.ts
│   │   │   │   └── index.ts
│   │   │   ├── rest.ts
│   │   │   ├── rest.type.ts
│   │   │   └── index.ts
│   │   └── index.ts
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
│   ├── home/                    # 🏠 homepage view
│   │   ├── components/
│   │   │   └── tech-radar/      # 📊 tech radar visualization
│   │   │       ├── index.ts
│   │   │       ├── tech-radar.const.ts
│   │   │       ├── tech-radar.tsx
│   │   │       └── tech-radar.type.ts
│   │   ├── home.tsx
│   │   └── index.ts
│   ├── pokemon-detail/          # 🐾 pokemon detail view
│   │   ├── components/
│   │   │   ├── pokemon-moves/
│   │   │   │   ├── index.ts
│   │   │   │   └── pokemon-moves.tsx
│   │   │   └── pokemon-species-info/
│   │   │       ├── index.ts
│   │   │       └── pokemon-species-info.tsx
│   │   ├── index.ts
│   │   ├── pokemon-detail.const.ts
│   │   ├── pokemon-detail.hook.ts
│   │   ├── pokemon-detail.tsx
│   │   ├── pokemon-detail.type.ts
│   │   └── pokemon-detail.util.ts
│   └── pokemons/                # 🎯 pokemon gallery view
│       ├── components/
│       │   └── pokemon-card/
│       │       ├── index.ts
│       │       └── pokemon-card.tsx
│       ├── index.ts
│       ├── pokemons.const.ts
│       ├── pokemons.tsx
│       └── pokemons.type.ts
├── favicon.ico
└── layout.tsx

/public/                         # 📁 static files
├── utils/                       # 🛠️ external scripts
│   └── tech-radar.js            # 📊 D3.js tech radar library
└── .gitkeep

/middleware.ts                   # 🛡️ security & CSP configuration
```

> 📝 **About `.gitkeep` files**: These are conventional files to keep empty folders in Git. They remain in folders that don't have implemented content yet.

---

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
├─────────────────────────────────────────┤
│    Constants, Types, Styles, Assets     │ ← Support & Configuration
│   (constants, typings, styles, public)  │   (Global configs, static files)
└─────────────────────────────────────────┘
```

**Benefits of this architecture:**

- ✅ **Scalability** - Clear separation allows teams to work on different layers
- ✅ **Maintainability** - Each layer can scale independently
- ✅ **Testability** - Each layer can be tested in isolation
- ✅ **Developer Experience** - Predictable patterns and structure

### 📂 Directory Mapping to Architecture Layers

| Architecture Layer    | Directories                                                    | Purpose                                 |
| --------------------- | -------------------------------------------------------------- | --------------------------------------- |
| **Routes**            | `/app/(routes)/`                                               | Server Components, pages, layouts       |
| **Queries**           | `query/` folders                                               | Route-specific data fetching            |
| **Views**             | `/app/views/`                                                  | Page structures and orchestration       |
| **Components**        | `/app/components/`                                             | Reusable UI building blocks             |
| **Services & Stores** | `/app/services/`, `/app/stores/`                               | Business logic and state management     |
| **Utils & Hooks**     | `/app/utils/`, `/app/hooks/`                                   | Shared utilities and custom hooks       |
| **Support & Config**  | `/app/constants/`, `/app/typings/`, `/app/styles/`, `/public/` | Global configurations and static assets |

### 🔄 Data Flow: Route → Query → View

```typescript
// 1. Route (Server Component) - Fetches data
const PagePokemons = async () => {
  const pokemonsData = await getPokemonsData()  // Query
  return <ViewPokemons {...pokemonsData} />    // Pass to View
}

// 2. Query - Abstracts API calls
const getPokemonsData = async () => {
  const response = await graphqlClient.query(GET_POKEMONS, { limit: 8 })
  return { success: true, data: response.data?.pokemons?.results || [] }
}

// 3. View - Renders with the data
const ViewPokemons = ({ success, data }) => {
  return <div>{data.map(pokemon => <PokemonCard pokemon={pokemon} />)}</div>
}
```

**Benefits of this separation:**

- ✅ **Testable views** - Direct props, no side effects
- ✅ **Reusable queries** - Can be called from other places
- ✅ **Server Components** - Queries execute on server
- ✅ **Type Safety** - Typed data flows from query to view
- ✅ **Maintenance** - Well-defined responsibilities

---

## 📋 Development Workflow

**Step-by-step guide for building your application:**

### 🔥 Getting Started

1. **Create new page** → `/app/(routes)/(public)/your-page-name/page.tsx`
2. **Add data fetching** → `/app/(routes)/(public)/your-page-name/query/` (if needed)
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

## 📂 Static Files Organization

Current static files structure:

```
/public/
├── utils/         # external scripts and libraries
│   └── tech-radar.js  # D3.js tech radar visualization
└── .gitkeep       # placeholder for future static files
```

**Recommended organization for additional static files:**

```
/public/
├── documents/     # pdfs, downloads
├── images/        # photos and images
├── utils/         # external scripts
├── robots.txt     # seo
└── sitemap.xml    # seo
```

> 📝 **Note**: In App Router, the default `favicon.ico` goes in `/app/favicon.ico`. The current `.gitkeep` file in `/public/` should be removed when adding real content.

---

## 🗺️ Route Organization

### 📄 Page Routes

**Implemented pattern:**

```
(public)/page-name/
├── page.tsx                     # page component
└── query/                       # data fetching logic
    ├── index.ts                 # exports
    ├── query.ts                 # fetch functions
    ├── query.const.ts           # GraphQL queries (optional)
    └── query.type.ts            # type definitions
```

**Real examples:**

```
(public)/pokemons/
├── page.tsx                     # renders pokemon gallery
└── query/
    ├── index.ts                 # exports getPokemonsData and types
    ├── query.ts                 # GraphQL pokemon fetching
    ├── query.const.ts           # GET_POKEMONS GraphQL query
    └── query.type.ts            # Pokemon, PokemonsResponse types

(public)/pokemons/[name]/
├── page.tsx                     # renders pokemon detail
├── not-found.tsx                # custom 404 for pokemon
└── query/
    ├── index.ts                 # exports getPokemonDetailData
    ├── query.ts                 # REST pokemon detail fetching
    └── query.type.ts            # PokemonDetail types
```

### 🔌 API Routes

```
api/your-endpoint/
└── route.ts                     # handles /api/your-endpoint requests
```

**Example:**

```
api/users/
└── route.ts                     # handles /api/users requests
```

### 🔄 Dynamic Routes

**Current implementations:**

```
[param]/
├── page.tsx                     # captures dynamic segments
├── not-found.tsx                # custom 404 (optional)
└── query/                       # receives params object
    ├── query.ts                 # params.param = "value"
    └── query.type.ts
```

**Examples:**

```
pokemons/[name]/
├── page.tsx                     # /pokemons/pikachu, /pokemons/charizard
├── not-found.tsx                # custom pokemon not found page
└── query/
    ├── query.ts                 # params.name = "pikachu"
    └── query.type.ts

user/[id]/
├── page.tsx                     # /user/123, /user/456
└── query/
    ├── query.ts                 # params.id = "123"
    └── query.type.ts

products/[category]/[slug]/
├── page.tsx                     # /products/electronics/phone
└── query/
    ├── query.ts                 # params.category, params.slug
    └── query.type.ts

api/users/[id]/
└── route.ts                     # /api/users/123
```

📚 **Learn more about Next.js routing:** [App Router - Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

### 🔗 Route-View Integration

The route structure has direct correspondence with views, and queries stay with the routes:

| Route                                            | View                                          | Query                    | Type             |
| ------------------------------------------------ | --------------------------------------------- | ------------------------ | ---------------- |
| `app/(routes)/(public)/(home)/page.tsx`          | `views/home/` → `ViewHome`                    | None (static)            | 🌐 Public        |
| `app/(routes)/(public)/pokemons/page.tsx`        | `views/pokemons/` → `ViewPokemons`            | `pokemons/query/`        | 🌐 Public        |
| `app/(routes)/(public)/pokemons/[name]/page.tsx` | `views/pokemon-detail/` → `ViewPokemonDetail` | `pokemons/[name]/query/` | 🌐 Public        |
| `app/(routes)/(auth)/sample-3/page.tsx`          | `views/sample-3/` → `ViewSample3`             | `sample-3/query/`        | 🔒 Authenticated |

**Pattern:**

```
(routes)/[group]/[page]/page.tsx    →  views/[page]/  →  View[Page]
(routes)/[group]/[page]/query/      →  Route-specific data fetching
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
├── components/                  # 🧩 internal components (optional)
│   └── sub-component/
└── index.ts                     # 📤 export file
```

> 🧪 **For detailed testing strategies and patterns, see:** [Testing Guide](./testing.md)

This structure applies to:

- 🧩 **components/** (spinner, modal, card)
- 📱 **views/** (home, pokemon-detail, pokemons)
- 🔧 **services/** (http, auth, payment)
- 🗃️ **stores/** (user, cart, theme)
- 🎣 **hooks/** (use-api, use-debounce)
- 🛠️ **utils/** (format-date, validate)

### 📋 Real Module Examples

#### 🧩 UI Component Module (Implemented)

```
spinner/
├── index.ts                     # 📤 exports
├── spinner.const.ts             # 📊 SPINNER_SIZE_CLASSES, SPINNER_COLOR_CLASSES
├── spinner.tsx                  # 📄 React component
└── spinner.type.ts              # 📝 ISpinnerProps, TSpinnerSize, TSpinnerColor
```

#### 📱 View Module (Implemented)

```
pokemon-detail/
├── components/                  # 🧩 view-internal components
│   ├── pokemon-moves/
│   │   ├── index.ts
│   │   └── pokemon-moves.tsx
│   └── pokemon-species-info/
│       ├── index.ts
│       └── pokemon-species-info.tsx
├── index.ts                     # 📤 exports
├── pokemon-detail.const.ts      # 📊 POKEMON_DETAIL_CONFIG, ERROR_MESSAGES
├── pokemon-detail.hook.ts       # 🎣 usePokemonSpecies, usePokemonMovesGraphQL
├── pokemon-detail.tsx           # 📄 main view component
├── pokemon-detail.type.ts       # 📝 interfaces and types
└── pokemon-detail.util.ts       # 🛠️ formatStatName, getEnglishDescription
```

#### 📱 Simple View Module (Implemented)

```
pokemons/
├── components/
│   └── pokemon-card/
│       ├── index.ts
│       └── pokemon-card.tsx
├── index.ts                     # 📤 exports
├── pokemons.const.ts            # 📊 POKEMON_GALLERY_CONFIG
├── pokemons.tsx                 # 📄 main view component
└── pokemons.type.ts             # 📝 IPokemonsViewProps, IPokemonCardProps
```

#### 🏠 View with Internal Components (Implemented)

```
home/
├── components/
│   └── tech-radar/              # 📊 tech radar visualization
│       ├── index.ts
│       ├── tech-radar.const.ts  # 📊 TECH_RADAR_CONFIG
│       ├── tech-radar.tsx       # 📄 D3.js tech radar component
│       └── tech-radar.type.ts   # 📝 RadarConfig, TechRadarProps
├── home.tsx                     # 📄 main view
└── index.ts                     # 📤 exports
```

#### 🔧 Service Module (Implemented)

```
http/
├── core/                        # 🎯 shared configuration
│   ├── core.ts                  # HTTP_CONFIG, adapter factories
│   ├── core.type.ts             # shared interfaces
│   ├── core.utils.ts            # request utilities
│   └── index.ts
├── graphql/                     # 📊 GraphQL client
│   ├── adapters/
│   │   ├── fetch-graphql.ts     # native fetch adapter
│   │   ├── graphql-request.ts   # graphql-request adapter
│   │   └── index.ts
│   ├── graphql.ts               # main GraphQL client
│   ├── graphql.type.ts          # GraphQL types
│   └── index.ts
├── providers/
│   ├── react-query.tsx          # HttpProvider component
│   └── index.ts
├── rest/                        # 🌐 REST client
│   ├── adapters/
│   │   ├── axios-rest.ts        # Axios adapter
│   │   ├── fetch-rest.ts        # native fetch adapter
│   │   └── index.ts
│   ├── rest.ts                  # main REST client
│   ├── rest.type.ts             # REST types
│   └── index.ts
└── index.ts                     # main exports
```

#### 📄 Query Module (Implemented)

```
pokemons/query/
├── index.ts                     # 📤 exports
├── query.const.ts               # 📊 GET_POKEMONS GraphQL query
├── query.ts                     # 📄 getPokemonsData function
└── query.type.ts                # 📝 Pokemon, PokemonsResponse types

pokemons/[name]/query/
├── index.ts                     # 📤 exports
├── query.ts                     # 📄 getPokemonDetailData function
└── query.type.ts                # 📝 PokemonDetail types
```

### 📤 Export Examples

**Standard export patterns from implemented modules:**

```typescript
// components/ui/spinner/index.ts
export { Spinner } from './spinner'
export { SPINNER_COLOR_CLASSES, SPINNER_SIZE_CLASSES } from './spinner.const'
export type { ISpinnerProps, TSpinnerColor, TSpinnerSize } from './spinner.type'

// views/pokemon-detail/index.ts
export { PokemonSpeciesInfo } from './components/pokemon-species-info'
export { ViewPokemonDetail } from './pokemon-detail'
export { ERROR_MESSAGES, POKEMON_DETAIL_CONFIG } from './pokemon-detail.const'
export { usePokemonSpecies } from './pokemon-detail.hook'
export type {
  IPokemonDetailViewProps,
  PokemonDetail,
  PokemonSpecies,
  UsePokemonSpeciesReturn,
} from './pokemon-detail.type'

// services/http/index.ts
export type {
  BaseRequestConfig,
  GraphQLError,
  HttpError,
} from './core/core.type'
export { graphqlClient } from './graphql'
export { restClient } from './rest'
export { HttpProvider } from './providers'
```

### 📍 Placement Guidelines

#### 🧩 Components

| Use `/components/ui/`      | Use `/components/structure/`  | Use `/views/[view]/components/` |
| -------------------------- | ----------------------------- | ------------------------------- |
| ✅ Reusable across app     | ✅ App structural elements    | ✅ Specific to one view only    |
| ✅ Design system elements  | ✅ Headers, footers, sidebars | ✅ Complex view-internal logic  |
| ✅ Buttons, inputs, modals | ✅ Navigation components      | ✅ Not reusable elsewhere       |
| **Example**: `spinner`     | **Example**: `header`         | **Example**: `pokemon-moves`    |

#### 🎣 Custom Hooks

> 📝 **For detailed custom hooks strategy, see:** [Code Standards](./code-standards.md)

| Use `/hooks/` (Global) | Use `[module-name].hook.ts` (Specific) |
| ---------------------- | -------------------------------------- |
| ✅ Reusable across app | ✅ Specific to one module only         |
| ✅ Used in 3+ places   | ✅ Business logic encapsulation        |
| **Example**: `use-api` | **Example**: `pokemon-detail.hook.ts`  |

#### 📊 Constants

> 📝 **For detailed constants strategy, see:** [Code Standards](./code-standards.md)

| Use `/constants/` (Global) | Use `[module-name].const.ts` (Specific) |
| -------------------------- | --------------------------------------- |
| ✅ Shared across app       | ✅ Module-specific values               |
| ✅ App configurations      | ✅ Component variants/sizes             |
| **Example**: `API_URLS`    | **Example**: `POKEMON_DETAIL_CONFIG`    |

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
| **Example**: `http service` | **Example**: `pokemon-detail.service.ts`  |

#### 🛠️ Utils

> 📝 **For detailed utilities patterns, see:** [Code Standards](./code-standards.md)

| Use `/utils/[utility]/`    | Use `[module-name].util.ts` (Specific) |
| -------------------------- | -------------------------------------- |
| ✅ Reusable across app     | ✅ Module-specific helpers             |
| ✅ Used in 3+ places       | ✅ Single-use calculations             |
| **Example**: `format-date` | **Example**: `pokemon-detail.util.ts`  |

#### 📝 Types

> 📝 **For detailed TypeScript patterns, see:** [Code Standards](./code-standards.md)

| Use `/typings/` (Global) | Use `[module-name].type.ts` (Specific) |
| ------------------------ | -------------------------------------- |
| ✅ Shared across app     | ✅ Module-specific interfaces          |
| ✅ API response types    | ✅ Component props                     |
| **Example**: `User`      | **Example**: `pokemon-detail.type.ts`  |

#### 🎨 Styles

| Use `/styles/` (Global) | Component-specific (Tailwind) |
| ----------------------- | ----------------------------- |
| ✅ Global CSS variables | ✅ Component styling          |
| ✅ Base styles, themes  | ✅ Utility classes            |

---

## 🚀 Complete Project Example

This is the **current implemented state** of the project:

```
/app
├── (routes)/                     # 🗂️ application routes
│   ├── api/                      # 🔌 api routes
│   │   └── .gitkeep              # placeholder for future API routes
│   ├── (auth)/                   # 🔒 authenticated routes
│   │   └── .gitkeep              # placeholder for auth pages
│   └── (public)/                 # 🌐 public routes
│       ├── (home)/               # 🏠 homepage
│       │   └── page.tsx
│       ├── pokemons/             # 📄 pokemon pages
│       │   ├── [name]/           # 🔄 dynamic pokemon detail
│       │   │   ├── page.tsx
│       │   │   ├── not-found.tsx
│       │   │   └── query/
│       │   │       ├── index.ts
│       │   │       ├── query.ts
│       │   │       └── query.type.ts
│       │   ├── page.tsx
│       │   └── query/
│       │       ├── index.ts
│       │       ├── query.const.ts
│       │       ├── query.ts
│       │       └── query.type.ts
│       └── layout.tsx
├── components/                   # 🧩 reusable components
│   ├── structure/                # 🏗️ structural components
│   │   └── .gitkeep              # placeholder for header, footer, etc.
│   └── ui/                       # 🎨 interface components
│       └── spinner/              # ✨ loading spinner
│           ├── index.ts
│           ├── spinner.const.ts
│           ├── spinner.tsx
│           └── spinner.type.ts
├── constants/                    # 📊 application constants
│   └── .gitkeep                  # placeholder for global constants
├── hooks/                        # 🎣 custom hooks
│   └── .gitkeep                  # placeholder for global hooks
├── services/                     # 🔧 services and apis
│   ├── http/                     # 📡 HTTP clients (REST + GraphQL)
│   │   ├── core/                 # 🎯 configuration and adapters
│   │   │   ├── core.ts           # HTTP_CONFIG and adapter factories
│   │   │   ├── core.type.ts      # shared interfaces and types
│   │   │   ├── core.utils.ts     # request utilities
│   │   │   └── index.ts
│   │   ├── graphql/              # 📊 GraphQL client
│   │   │   ├── adapters/
│   │   │   │   ├── fetch-graphql.ts      # native fetch GraphQL adapter
│   │   │   │   ├── graphql-request.ts    # graphql-request adapter
│   │   │   │   └── index.ts
│   │   │   ├── graphql.ts        # main GraphQL client
│   │   │   ├── graphql.type.ts   # GraphQL-specific types
│   │   │   └── index.ts
│   │   ├── providers/            # 🎛️ React integration
│   │   │   ├── react-query.tsx   # HttpProvider component
│   │   │   └── index.ts
│   │   ├── rest/                 # 🌐 REST client
│   │   │   ├── adapters/
│   │   │   │   ├── axios-rest.ts # axios adapter (optional)
│   │   │   │   ├── fetch-rest.ts # native fetch adapter (default)
│   │   │   │   └── index.ts
│   │   │   ├── rest.ts           # main REST client
│   │   │   ├── rest.type.ts      # REST-specific types
│   │   │   └── index.ts
│   │   └── index.ts              # main entry point
│   └── .gitkeep                  # placeholder for other services
├── stores/                       # 🗃️ state stores
│   └── .gitkeep                  # placeholder for Zustand stores
├── styles/                       # 🎨 global styles
│   └── globals.css
├── typings/                      # 📝 global types
│   └── .gitkeep                  # placeholder for global types
├── utils/                        # 🛠️ utility functions
│   └── .gitkeep                  # placeholder for global utilities
├── views/                        # 📱 views/page structures
│   ├── home/                     # 🏠 homepage view
│   │   ├── components/
│   │   │   └── tech-radar/       # 📊 tech radar visualization
│   │   │       ├── index.ts
│   │   │       ├── tech-radar.const.ts
│   │   │       ├── tech-radar.tsx
│   │   │       └── tech-radar.type.ts
│   │   ├── home.tsx
│   │   └── index.ts
│   ├── pokemon-detail/           # 🐾 pokemon detail view
│   │   ├── components/
│   │   │   ├── pokemon-moves/
│   │   │   │   ├── index.ts
│   │   │   │   └── pokemon-moves.tsx
│   │   │   └── pokemon-species-info/
│   │   │       ├── index.ts
│   │   │       └── pokemon-species-info.tsx
│   │   ├── index.ts
│   │   ├── pokemon-detail.const.ts
│   │   ├── pokemon-detail.hook.ts
│   │   ├── pokemon-detail.tsx
│   │   ├── pokemon-detail.type.ts
│   │   └── pokemon-detail.util.ts
│   └── pokemons/                 # 🎯 pokemon gallery view
│       ├── components/
│       │   └── pokemon-card/
│       │       ├── index.ts
│       │       └── pokemon-card.tsx
│       ├── index.ts
│       ├── pokemons.const.ts
│       ├── pokemons.tsx
│       └── pokemons.type.ts
├── favicon.ico
└── layout.tsx

/public/                          # 📁 static files
├── utils/                        # 🛠️ external scripts
│   └── tech-radar.js             # 📊 D3.js tech radar library
└── .gitkeep                      # placeholder for other static files

/middleware.ts                    # 🛡️ security & CSP configuration
```

📚 **Learn more about Next.js project organization:** [App Router Documentation](https://nextjs.org/docs/app)

---

### Related Documentation

- 📊 **[Data Fetching Strategy](./data-fetching-strategy.md)** - WHEN and WHY to use server vs client data fetching
- 🔧 **[HTTP Service Guide](./http-service.md)** - HOW to use REST and GraphQL clients (technical implementation)
- 📝 **[Code Standards](./code-standards.md)** - HOW to write code, naming patterns, quality standards
- 📚 **[README](../README.md)** - Project setup and overview
