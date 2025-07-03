# Code Standards

> 📝 **Complete guide for writing consistent, quality code in this template.** Naming conventions, TypeScript patterns, and automated quality standards.

## 📋 Table of Contents

- [📋 Development Workflow](#-development-workflow)
  - [🔥 Basic Standards](#-basic-standards)
  - [🧩 Naming Conventions](#-naming-conventions)
  - [🏹 Code Structure](#-code-structure)
  - [🎯 Quality Assurance](#-quality-assurance)
- [🏗️ Implementation Patterns](#️-implementation-patterns)
  - [📝 Naming Conventions](#-naming-conventions-1)
  - [📘 TypeScript Conventions](#-typescript-conventions)
  - [📊 Data Fetching Patterns](#-data-fetching-patterns)
  - [🗃️ State Management Patterns](#️-state-management-patterns)
- [✅ Code Standards Summary](#-code-standards-summary)
  - [Implementation Checklist](#implementation-checklist)
  - [Related Documentation](#related-documentation)

---

## 📋 Development Workflow

**Step-by-step guide for writing quality code:**

### 🔥 Basic Standards

1. **Always use arrow functions** → No function declarations allowed
2. **Use explicit returns** → Always return explicitly, even for simple functions
3. **Apply TypeScript strictly** → Interfaces with `I`, Types with `T`, no `any`

### 🧩 Naming Conventions

1. **Name files consistently** → `kebab-case` for all files and directories
2. **Use proper prefixes** → `I` for interfaces, `T` for types, `View`/`Page` for components
3. **Be descriptive** → Clear, meaningful names for variables and functions
4. **Follow case patterns** → `camelCase` variables, `PascalCase` components, `UPPER_SNAKE_CASE` constants

### 🏹 Code Structure

1. **Structure components properly** → Props typing, logic separation, clean JSX
2. **Handle state correctly** → Local vs global state decisions
3. **Write clean logic** → Custom hooks for business logic, utility functions for helpers
4. **Organize imports properly** → React → External → Internal (@/) → Relative (./) → CSS (automated by ESLint)

### 🎯 Quality Assurance

1. **Test systematically** → Behavior-focused testing, co-located test files
2. **Maintain quality** → Automated tools (ESLint, Prettier) + manual reviews
3. **Apply patterns consistently** → Same structure across all modules
4. **Ensure test coverage** → Minimum 80% coverage required for the entire project

---

## 🏗️ Implementation Patterns

### 📝 Naming Conventions

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
| **Union types**       | `type`      | `type TUserRole = 'admin' \| 'user'`          |
| **Literal unions**    | `type`      | `type TVariant = 'primary' \| 'secondary'`    |
| **Function types**    | `type`      | `type THandler = (id: string) => void`        |
| **Generic utilities** | `type`      | `type TApiResponse<T> = { data: T }`          |

### 📊 Data Fetching Patterns

> 📊 **For detailed data fetching strategies, see:** [Data Fetching Strategy](./data-fetching-strategy.md)

#### Server-Side vs Client-Side Decision

| Data Type                      | Use Server-Side | Use Client-Side |
| ------------------------------ | --------------- | --------------- |
| **SEO-critical data**          | ✅ Always       | ❌              |
| **Above-the-fold content**     | ✅ Always       | ❌              |
| **Static/semi-static content** | ✅ Always       | ❌              |
| **Real-time data**             | ❌              | ✅ Always       |
| **User interactions**          | ❌              | ✅ Always       |
| **Pagination/filtering**       | ❌              | ✅ Always       |

#### HTTP Client Usage for Data Fetching

Use `restClient` and `graphqlClient` consistently across server and client contexts.

### 🗃️ State Management Patterns

#### React State vs Zustand Decision

| State Type              | Use React State | Use Zustand Store |
| ----------------------- | --------------- | ----------------- |
| **Form data**           | ✅ Local state  | ❌                |
| **Modal open/close**    | ✅ Local state  | ❌                |
| **User authentication** | ❌              | ✅ Global state   |
| **Shopping cart**       | ❌              | ✅ Global state   |
| **Theme preference**    | ❌              | ✅ Global state   |

#### Custom Hooks for Reusable Logic

When the same state logic is used across multiple components, extract to custom hooks.

---

## ✅ Code Standards Summary

### Implementation Checklist

**For every new component/module:**

- ✅ **Use arrow functions** with explicit returns
- ✅ **Follow naming conventions** (kebab-case files, PascalCase components)
- ✅ **Apply proper prefixes** (I for interfaces, T for types)
- ✅ **Organize imports correctly** (automated by ESLint)
- ✅ **Write comprehensive tests** (behavior-focused)
- ✅ **Use TypeScript strictly** (no any, proper interfaces/types)
- ✅ **Structure code cleanly** (hooks → state → handlers → JSX)

**For HTTP client usage:**

- ✅ **Import HTTP clients consistently** (from @/app/services/http)
- ✅ **Type API responses properly** (Promise<IResponseType>)
- ✅ **Handle errors appropriately** (try/catch with meaningful messages)

### Related Documentation

- 📊 **[Data Fetching Strategy](./data-fetching-strategy.md)** - WHEN and WHY to use server vs client data fetching
- 🔧 **[HTTP Service Guide](./http-service.md)** - HOW to use REST and GraphQL clients (technical implementation)
- 📁 **[Project Organization](./project-organization.md)** - WHERE to organize files and folders
- 📚 **[README](../README.md)** - Project setup and overview
