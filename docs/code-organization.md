# Code Organization

Codebase organization, architectural patterns, and standardized naming conventions for maintainable project structure.

## Table of Contents

### [Naming Conventions](#naming-conventions)

- [Casing Strategy Overview](#casing-strategy-overview)

### [Project Structure](#project-structure)

- [Directory Structure](#directory-structure)
- [Organizational Patterns](#organizational-patterns)
- [Module Structure Hierarchy](#module-structure-hierarchy)
- [Module Growth Strategy](#module-growth-strategy)

---

## Naming Conventions

### Casing Strategy Overview

The project follows a comprehensive casing strategy to ensure consistency and maintainability:

| Element Type              | Casing             | Purpose                        |
| ------------------------- | ------------------ | ------------------------------ |
| **Files & Directories**   | `kebab-case`       | Filesystem compatibility       |
| **React Components**      | `PascalCase`       | Component identification       |
| **Interfaces**            | `IPascalCase`      | Type distinction               |
| **Type Aliases**          | `TPascalCase`      | Type alias identification      |
| **Variables & Functions** | `camelCase`        | Standard JavaScript convention |
| **Custom Hooks**          | `useCamelCase`     | React hook convention          |
| **Constants**             | `UPPER_SNAKE_CASE` | Global constant identification |

## Project Structure

### Directory Structure

```
app/                              # application source code
├── (routes)/                     # route groups
│   ├── (public)/                 # public access routes
│   ├── (auth)/                   # authentication routes
│   └── api/                      # api endpoint routes
├── components/                   # reusable components
│   ├── structure/                # structural components
│   └── ui/                       # user interface elements
├── constants/                    # constant values
├── hooks/                        # custom react hooks
├── services/                     # service layers
├── stores/                       # state stores
├── styles/                       # styling files
├── types/                        # type definitions
├── utils/                        # utility functions
└── views/                        # view components

docs/                             # documentation files
public/                           # next.js static assets
```

### Organizational Patterns

#### Module Structure Hierarchy

All complex modules follow consistent internal organization patterns. Whether it's a component, service, hook, store, or utility, the same structural hierarchy applies:

```
my-module/
├── my-module.{tsx|ts}           # main implementation file
├── my-module.type.ts            # typescript interfaces and types
├── my-module.const.ts           # constants and configurations
├── my-module.test.{tsx|ts}      # unit tests for module
├── my-module.hook.ts            # custom hooks (when applicable)
├── my-module.hook.test.ts       # hook-specific tests
└── index.ts                     # clean export barrel
```

#### Module Growth Strategy

Modules evolve naturally from simple implementations to complex structures. Understanding when to add each file helps maintain organization as functionality grows.

**Stage 1: Start Simple**

```
my-module/
├── my-module.{tsx|ts}           # core implementation
└── index.ts                     # clean export
```

**Stage 2: Add Types**

```
my-module/
├── my-module.{tsx|ts}           # core implementation
├── my-module.type.ts            # interfaces and type definitions
└── index.ts                     # clean export
```

**Stage 3: Add Tests**

```
my-module/
├── my-module.{tsx|ts}           # core implementation
├── my-module.type.ts            # interfaces and type definitions
├── my-module.test.{tsx|ts}      # unit tests
└── index.ts                     # clean export
```

**Stage 4: Add Constants**

```
my-module/
├── my-module.{tsx|ts}           # core implementation
├── my-module.type.ts            # interfaces and type definitions
├── my-module.test.{tsx|ts}      # unit tests
├── my-module.const.ts           # constants and configurations
└── index.ts                     # clean export
```

**Stage 5: Add Hooks**

```
my-module/
├── my-module.{tsx|ts}           # core implementation
├── my-module.type.ts            # interfaces and type definitions
├── my-module.test.{tsx|ts}      # unit tests
├── my-module.const.ts           # constants and configurations
├── my-module.hook.ts            # custom hooks
├── my-module.hook.test.ts       # hook tests
└── index.ts                     # clean export
```
