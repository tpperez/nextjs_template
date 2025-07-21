# Directory Structure

Codebase organization and architectural patterns for maintainable project structure.

## root level organization

```
app-next-template-demo/
├── app/                          # next.js app directory (primary source)
├── docs/                         # project documentation
├── public/                       # static assets and resources
├── .husky/                       # git hooks configuration
├── .next/                        # next.js build output (auto-generated)
├── node_modules/                 # dependency installations (auto-generated)
├── .env.example                  # environment variable template
├── .gitignore                    # version control exclusions
├── .lintstagedrc.mjs            # staged file linting configuration
├── .nvmrc                       # node version specification
├── commitlint.config.mjs        # commit message standards
├── eslint.config.mjs            # linting rules configuration
├── next.config.mjs              # next.js framework configuration
├── package.json                  # project metadata and scripts
├── package-lock.json            # dependency lock file
├── prettier.config.mjs          # code formatting rules
├── README.md                    # project overview and quick start
├── tailwind.config.ts           # tailwind css configuration
├── tsconfig.json                # typescript compiler settings
└── vitest.config.mts            # testing framework configuration
```

## app directory structure

next.js 14+ app router architecture with clear separation of concerns:

```
app/
├── (routes)/                     # route groups for organization
│   ├── (public)/                # public access routes
│   │   ├── layout.tsx           # public route layout wrapper
│   │   ├── page.tsx             # root public page
│   │   └── about/               # about page route
│   └── (protected)/             # authenticated access routes
│       ├── layout.tsx           # protected route layout wrapper
│       └── dashboard/           # dashboard application routes
├── components/                   # reusable ui components
│   ├── structure/               # layout and navigation components
│   │   ├── header/              # site header component
│   │   └── footer/              # site footer component
│   └── ui/                      # generic ui elements
│       └── spinner/             # loading spinner component
├── services/                    # external service integrations
│   └── http/                    # http client abstractions
│       └── core/                # base http functionality
├── stores/                      # global state management
├── types/                       # typescript type definitions
├── utils/                       # utility functions and helpers
├── views/                       # page-specific components and logic
│   ├── home/                    # home page components
│   │   └── components/          # home-specific ui elements
│   └── pokemon/                 # pokemon feature components
├── favicon.ico                  # site favicon
├── globals.css                  # global stylesheet
├── layout.tsx                   # root layout component
└── loading.tsx                  # global loading component
```

## component organization patterns

### component structure hierarchy

components follow consistent internal organization:

```
component-name/
├── component-name.tsx           # main component implementation
├── component-name.type.ts       # typescript interfaces and types
├── component-name.const.ts      # component constants and configurations
├── component-name.test.tsx      # unit tests for component
├── component-name.hook.ts       # custom hooks (when applicable)
├── component-name.hook.test.ts  # hook-specific tests
└── index.ts                     # clean export interface
```

### component categorization

#### structure components

layout and navigation elements that provide application structure:

- header: site navigation and branding
- footer: site footer content and links
- layout wrappers for different route groups

#### ui components

generic, reusable interface elements:

- form controls and inputs
- buttons and interactive elements
- loading indicators and spinners
- modal dialogs and overlays

#### feature components

domain-specific components tied to business logic:

- user profile management
- data visualization elements
- form handling components
- api integration displays

#### view components

page-specific components organized by route or feature:

- home page components and sections
- feature-specific sub-components
- route-specific layouts and wrappers

## service layer architecture

### http service organization

```
services/
└── http/
    ├── core/                    # base http functionality
    │   ├── core.type.ts        # http interfaces and types
    │   └── adapters/           # different http client implementations
    ├── rest/                   # rest api client services
    │   ├── rest.client.ts      # rest client implementation
    │   └── rest.type.ts        # rest-specific types
    ├── graphql/                # graphql client services
    │   ├── graphql.client.ts   # graphql client implementation
    │   └── graphql.type.ts     # graphql-specific types
    └── index.ts                # service layer exports
```

### service integration pattern

services provide abstraction between components and external apis:

- dependency injection for different http clients
- consistent error handling across service calls
- caching integration with react query
- request/response transformation utilities

## state management structure

### store organization

```
stores/
├── global/                      # application-wide state
│   ├── auth.store.ts           # authentication state management
│   ├── theme.store.ts          # ui theme and preferences
│   └── navigation.store.ts     # navigation state tracking
├── feature/                    # feature-specific state
│   ├── pokemon.store.ts        # pokemon data management
│   └── user.store.ts           # user profile state
└── index.ts                    # store exports and configuration
```

### state management patterns

zustand stores follow consistent patterns:

- immutable state updates
- typescript interface definitions
- action creators for state modifications
- selectors for computed values

## view layer organization

### page-specific components

```
views/
├── home/                       # home page feature
│   ├── components/             # home-specific ui elements
│   │   ├── tech-radar/        # technology radar component
│   │   └── hero-section/      # home page hero content
│   ├── home.view.tsx          # main home view component
│   └── home.types.ts          # home-specific type definitions
└── pokemon/                   # pokemon feature example
    ├── components/            # pokemon-specific components
    │   ├── pokemon-list/      # pokemon listing component
    │   └── pokemon-card/      # individual pokemon display
    ├── hooks/                 # pokemon-related custom hooks
    └── pokemon.types.ts       # pokemon type definitions
```

### view component patterns

views encapsulate page-level logic and coordinate between:

- data fetching through custom hooks
- state management via stores
- ui rendering through components
- routing and navigation handling

## utility organization

### helper function structure

```
utils/
├── format/                     # data formatting utilities
│   ├── date.util.ts           # date formatting functions
│   ├── currency.util.ts       # currency display helpers
│   └── text.util.ts           # text manipulation utilities
├── validation/                 # input validation helpers
│   ├── form.util.ts           # form validation rules
│   └── api.util.ts            # api response validation
├── constants/                  # application-wide constants
│   ├── api.const.ts           # api endpoint configurations
│   └── app.const.ts           # application configuration values
└── index.ts                   # utility function exports
```

## static asset management

### public directory organization

```
public/
├── images/                     # image assets
│   ├── icons/                 # icon files and svg graphics
│   └── photos/                # photographic content
├── js/                        # external javascript libraries
│   └── tech-radar.js          # third-party visualization library
├── favicon.ico                # site favicon
└── robots.txt                 # search engine directives
```

### asset naming conventions

static assets follow descriptive naming patterns:

- images: descriptive-name.extension
- icons: icon-purpose.svg
- external scripts: library-name.version.js

## testing structure alignment

### test file organization

tests mirror source code structure with .test extensions:

```
app/
├── components/
│   └── ui/
│       └── spinner/
│           ├── spinner.tsx
│           └── spinner.test.tsx    # component tests
├── services/
│   └── http/
│       └── core/
│           ├── core.type.ts
│           └── core.test.ts        # service tests
└── views/
    └── home/
        └── components/
            └── tech-radar/
                ├── tech-radar.tsx
                └── tech-radar.test.tsx  # view component tests
```

## configuration file placement

### root level configuration

configuration files remain at project root for tool discovery:

- package.json: npm configuration and scripts
- tsconfig.json: typescript compiler settings
- eslint.config.mjs: linting rules and extensions
- prettier.config.mjs: code formatting preferences
- tailwind.config.ts: css framework configuration
- next.config.mjs: next.js framework settings
- vitest.config.mts: testing framework setup

## architectural boundaries

### clear separation of concerns

directory structure enforces architectural boundaries:

- components handle ui rendering and user interaction
- services manage external api communication
- stores maintain application state
- views coordinate page-level functionality
- utils provide pure helper functions

### dependency flow

architecture encourages unidirectional data flow:

- views depend on components, services, and stores
- components depend on utilities and types
- services provide data to stores and views
- utilities remain dependency-free for maximum reusability

## scalability considerations

### feature-based organization

structure supports growth through feature modules:

- new features add directories under views/
- feature-specific components stay localized
- shared components promote reusability
- service layer scales with additional apis

### maintenance efficiency

organization optimizes for developer productivity:

- related files stay physically close
- consistent patterns reduce cognitive load
- clear boundaries prevent coupling issues
- modular structure supports team collaboration
