# Development Guide

**Navigation:** [README](../README.md) | [Architecture Guide](ARCHITECTURE.md)

---

## Data Fetching Patterns

### Hybrid Strategy: Server-Side + Client-Side

The project uses a **hybrid approach** combining server-side and client-side data fetching for optimal performance and user experience.

**Server-Side First:** Initial page data loaded via `route/queries/` for SEO and fast first paint
**Client-Side Complement:** Dynamic interactions handled via `view.hook.ts` for real-time updates

### When to Use Server-Side Queries

**Location:** `app/(routes)/pokemon/[id]/queries/`

**Use Cases:**

- Initial page data loading
- SEO-critical content
- Static or semi-static data
- Above-the-fold content
- Data needed for page rendering

**Real Examples:**

```typescript
// get-pokemon-detail.query.ts
export const getPokemonDetailData = async (name: string) => {
  const pokemon = await restClient.get<IPokemonDetail>(`/pokemon/${name}`)
  return { success: true, data: pokemon }
}

// page.tsx
const pokemonData = await getPokemonDetailData(name)
return <ViewPokemonDetail data={pokemonData.data} />
```

### When to Use Client-Side Hooks

**Location:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

**Use Cases:**

- User interactions (search, filters)
- Real-time updates
- Conditional data loading
- Background data refreshing
- Infinite scroll / pagination
- Data that depends on user state

**Real Examples:**

```typescript
// pokemon-detail.hook.ts - Species data loaded after user interaction
export const usePokemonSpecies = (pokemonId: number) => {
  return useQuery({
    queryKey: [POKEMON_DETAIL_QUERY_KEY, pokemonId],
    queryFn: () => fetchPokemonSpecies(pokemonId),
    staleTime: POKEMON_DETAIL_CONFIG.SPECIES_CACHE_MINUTES * 60 * 1000,
  })
}

// pokemon-search.hook.ts - Search triggered by user input
export const usePokemonNameSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: [POKEMON_SEARCH_QUERY_KEY, searchTerm],
    queryFn: () => searchPokemonByName(searchTerm),
    enabled: !!searchTerm.trim(), // Only when user types
  })
}

// pokemons.hook.ts - Infinite scroll for more data
export const useMorePokemons = () => {
  return useInfiniteQuery({
    queryKey: POKEMONS_QUERY_CONFIG.QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      // Load more Pokemon on scroll
    },
    enabled: false, // Manual trigger
  })
}
```

### Decision Matrix

| Scenario            | Server-Side Route Queries | Client-Side View Hooks      |
| ------------------- | ------------------------- | --------------------------- |
| Page initial load   | ✅ Fast first paint       | ❌ Loading state required   |
| SEO requirements    | ✅ Crawlable content      | ❌ Not indexed              |
| User search/filter  | ❌ Requires page reload   | ✅ Instant updates          |
| Real-time data      | ❌ Static until refresh   | ✅ Background updates       |
| Conditional loading | ❌ Always fetched         | ✅ Load when needed         |
| Error boundaries    | ✅ Page-level handling    | ✅ Component-level handling |

### Implementation Patterns

**Server-Side Pattern:**

```bash
app/(routes)/pokemon/[id]/
├── page.tsx                              # consumes query data
└── queries/                              # server-side fetching
    ├── get-pokemon-detail.query.ts       # main data
    └── get-pokemon-detail.type.ts        # response types
```

**Client-Side Pattern:**

```bash
app/views/pokemon-detail/
├── pokemon-detail.tsx                    # uses hooks
├── pokemon-detail.hook.ts                # client queries
└── pokemon-detail.type.ts                # hook return types
```

**Combined Usage:**

```typescript
// page.tsx - Server-side initial data
const pokemonData = await getPokemonDetailData(name)

// pokemon-detail.tsx - Client-side additional data
export const ViewPokemonDetail = ({ data: pokemon }) => {
  // Additional data loaded on client
  const { species, isLoading } = usePokemonSpecies(pokemon.id)
  const { result: searchResult } = usePokemonNameSearch(searchTerm)

  return (
    <div>
      {/* Server data immediately available */}
      <h1>{pokemon.name}</h1>

      {/* Client data with loading states */}
      {isLoading ? <Spinner /> : <SpeciesInfo species={species} />}
      {searchResult && <SearchResults results={searchResult} />}
    </div>
  )
}
```

**Architectural Context:** This implementation follows our [Hybrid Data Fetching Architecture](ARCHITECTURE.md#hybrid-data-fetching-architecture) design principles.

---

## Overview

Development standards and workflows for the Next.js template. Covers coding conventions, testing patterns, and daily development tasks to ensure consistency across the codebase.

---

## Directory Structure

### Core Application Directories

| Directory                   | Purpose                       | When to Use                               | Examples                            |
| --------------------------- | ----------------------------- | ----------------------------------------- | ----------------------------------- |
| `app/(routes)/`             | next.js app router pages      | creating new routes and pages             | `/pokemons`, `/pokemon/[name]`      |
| `route/queries/`            | server-side data fetching     | route-specific api calls                  | `get-pokemon-detail.query.ts`       |
| `app/views/`                | complete page implementations | page-level components with business logic | `ViewPokemonDetail`, `ViewPokemons` |
| `app/components/ui/`        | reusable ui elements          | shared across 3+ different modules        | `Spinner`, `Button`, `Modal`        |
| `app/components/structure/` | layout and navigation         | app shell, headers, footers               | `Header`, `Sidebar`, `Layout`       |
| `app/services/`             | business logic and apis       | http clients, external integrations       | `httpService`, `authService`        |
| `app/stores/`               | global state management       | zustand stores for app-wide state         | `usePokemonHistoryStore`            |
| `app/hooks/`                | global custom hooks           | reused across multiple views              | `useLocalStorage`, `useDebounce`    |
| `app/utils/`                | pure utility functions        | helper functions used globally            | `formatDate`, `validateEmail`       |
| `app/constants/`            | global configuration          | app-wide constants and config             | `API_ENDPOINTS`, `ROUTES`           |
| `app/typings/`              | global type definitions       | shared typescript interfaces              | `IApiResponse`, `IUser`             |

### Route-Specific Structure

```bash
app/(routes)/(public)/(examples)/pokemons/
├── page.tsx                              # route component
├── loading.tsx                           # loading ui
├── error.tsx                             # error boundary
├── not-found.tsx                         # 404 page
├── [name]/                               # dynamic route
│   ├── page.tsx
│   └── queries/                          # route-specific data fetching
│       ├── index.ts                      # query exports
│       ├── get-pokemon-detail.query.ts
│       ├── get-pokemon-detail.type.ts
│       ├── get-pokemon-species.query.ts
│       └── get-pokemon-species.type.ts
└── queries/                              # shared route queries
    ├── index.ts
    ├── get-pokemons-list.query.ts
    └── get-pokemons-list.type.ts
```

### View-Specific Structure

```bash
app/views/pokemon-detail/
├── index.ts                              # public exports
├── pokemon-detail.tsx                    # main view component
├── pokemon-detail.type.ts                # view-specific types
├── pokemon-detail.const.ts               # view constants
├── pokemon-detail.hook.ts                # view-specific hooks
├── pokemon-detail.util.ts                # view utilities
└── components/                           # view-internal components
    ├── pokemon-moves.tsx
    └── pokemon-species-info.tsx
```

### Decision Guidelines

**Place in Global Directories When:**

- Used across 3+ different modules
- Core application functionality
- Design system components
- Business domain services

**Place in Module-Specific When:**

- Used only within one view/route
- Specific to one feature
- Internal implementation details
- Context-specific logic

**Real Examples:**

- `PokemonCard` → used in list and detail → `app/components/ui/`
- `PokemonMoves` → only in detail view → `app/views/pokemon-detail/components/`
- `usePokemonSpecies` → only in detail → `pokemon-detail.hook.ts`
- `get-pokemon-detail.query.ts` → specific to pokemon detail route → `route/queries/`
- `formatName` → used globally → could be in `app/utils/`

**Architectural Context:** See [Component Architecture](ARCHITECTURE.md#component-architecture) for the rationale behind this hierarchy and placement strategy.

---

## Code Standards

### TypeScript Conventions

**Required Standards:**

- no `any` types (enforced by eslint)
- explicit return types for functions
- interface definitions for data structures
- component and architectural prefixes (see naming conventions below)

**Type Definition Guidelines:**

| Use Case            | Convention  | Example                                           |
| ------------------- | ----------- | ------------------------------------------------- |
| Component props     | `interface` | `interface IPokemonDetailViewProps`               |
| Object structures   | `interface` | `interface IPokemon`, `interface IPokemonSpecies` |
| Hook return types   | `type`      | `type TUsePokemonSpeciesReturn`                   |
| Union types         | `type`      | `type TPokemonType = 'fire' \| 'water'`           |
| Literal unions      | `type`      | `type TVariant = 'primary' \| 'secondary'`        |
| Function signatures | `type`      | `type TPokemonHandler = (id: number) => void`     |

**Naming Conventions:**

| Element Type            | Convention             | Example                                   |
| ----------------------- | ---------------------- | ----------------------------------------- |
| Files and directories   | `kebab-case`           | `pokemon-detail`, `pokemon-search`        |
| Components              | `PascalCase`           | `PokemonCard`, `PokemonMoves`             |
| View components         | `View` prefix          | `ViewPokemonDetail`, `ViewPokemons`       |
| Custom hooks            | `use` prefix           | `usePokemonHistory`, `usePokemonSpecies`  |
| Variables and functions | `camelCase`            | `pokemonName`, `fetchPokemonData`         |
| Constants               | `SCREAMING_SNAKE_CASE` | `POKEMON_DETAIL_CONFIG`, `ERROR_MESSAGES` |
| GraphQL queries         | `GET_/POST_` prefix    | `GET_POKEMON_BY_NAME`, `GET_POKEMONS`     |
| Interfaces              | `I` prefix             | `IPokemon`, `IPokemonDetailViewProps`     |
| Types                   | `T` prefix             | `TPokemonType`, `TUsePokemonReturn`       |

**Directory and File Suffix Correlation:**

| Directory (Plural) | File Suffix (Singular) | Example                       |
| ------------------ | ---------------------- | ----------------------------- |
| `app/hooks/`       | `.hook.ts`             | `use-local-storage.hook.ts`   |
| `app/components/`  | `.tsx` (no suffix)     | `pokemon-card.tsx`            |
| `app/utils/`       | `.util.ts`             | `format-pokemon-name.util.ts` |
| `app/stores/`      | `.store.ts`            | `pokemon-history.store.ts`    |
| `app/constants/`   | `.const.ts`            | `api-endpoints.const.ts`      |
| `app/typings/`     | `.type.ts`             | `pokemon-api.type.ts`         |
| `app/services/`    | `.service.ts`          | `pokemon-api.service.ts`      |
| `app/views/`       | `.tsx` (no suffix)     | `pokemon-detail.tsx`          |
| `view/components/` | `.tsx` (no suffix)     | `pokemon-moves.tsx`           |
| `route/queries/`   | `.query.ts`            | `get-pokemon-detail.query.ts` |

**Module-Specific Files:**

| Module File Type | Suffix Pattern         | Example                   |
| ---------------- | ---------------------- | ------------------------- |
| Main component   | `module-name.tsx`      | `pokemon-detail.tsx`      |
| Component tests  | `module-name.test.tsx` | `pokemon-detail.test.tsx` |
| Type definitions | `module-name.type.ts`  | `pokemon-detail.type.ts`  |
| Constants        | `module-name.const.ts` | `pokemon-detail.const.ts` |
| Custom hooks     | `module-name.hook.ts`  | `pokemon-detail.hook.ts`  |
| Utilities        | `module-name.util.ts`  | `pokemon-detail.util.ts`  |

### Import Organization

Import statements are **automatically organized by ESLint** in this order:

1. react and framework imports
2. external libraries
3. internal imports (@/ alias)
4. relative imports
5. css and style imports

**No manual intervention required** - ESLint handles sorting and formatting automatically.

**Architectural Context:** These standards implement the [Design Decisions and Rationale](ARCHITECTURE.md#design-decisions-and-rationale) established for the project architecture.

---

## Quick Reference

### Creating New Views

```bash
# view structure
app/views/pokemon-list/
├── index.ts                              # public exports
├── pokemon-list.tsx                      # component implementation
├── pokemon-list.test.tsx                 # component tests
├── pokemon-list.type.ts                  # typescript definitions
├── pokemon-list.hook.ts                  # custom hooks (optional)
└── components/                           # view-specific components
```

### Adding Routes

```bash
# route with data fetching
app/(routes)/(public)/pokemon/[id]/
├── page.tsx                              # route component
├── loading.tsx                           # loading state
├── error.tsx                             # error boundary
└── queries/                              # data fetching (plural)
    ├── index.ts                          # query exports
    ├── get-pokemon-detail.query.ts
    ├── get-pokemon-detail.type.ts
    ├── get-pokemon-moves.query.ts
    └── get-pokemon-moves.type.ts
```

### Custom Hooks Pattern

```typescript
// pokemon-detail.hook.ts
export function usePokemonSpecies(pokemonId: number): TUsePokemonSpeciesReturn {
  return useQuery({
    queryKey: [POKEMON_DETAIL_QUERY_KEY, pokemonId],
    queryFn: () => fetchPokemonSpecies(pokemonId),
    staleTime: POKEMON_DETAIL_CONFIG.SPECIES_CACHE_MINUTES * 60 * 1000,
    retry: POKEMON_DETAIL_CONFIG.RETRY_COUNT,
  })
}
```

### Component Test Pattern

```typescript
// pokemon-detail.test.tsx
import { render, screen } from '@/utils/test-utils'
import { ViewPokemonDetail } from './pokemon-detail'

describe('ViewPokemonDetail', () => {
  const mockPokemon = {
    id: 1,
    name: 'pikachu',
    sprites: { front_default: 'pikachu.png' }
  }

  it('displays pokemon information', () => {
    render(<ViewPokemonDetail data={mockPokemon} />)
    expect(screen.getByText('pikachu')).toBeInTheDocument()
  })
})
```

**Architectural Context:** These patterns align with our [Testing Architecture](ARCHITECTURE.md#testing-architecture) strategy and co-location principles.

---

## Testing Guidelines

### Co-location Principle

Tests are placed next to implementation files for easier maintenance and discovery.

```bash
app/views/pokemon-detail/
├── pokemon-detail.tsx
├── pokemon-detail.test.tsx               # component test
├── pokemon-detail.hook.ts
├── pokemon-detail.hook.test.ts           # hook test
└── pokemon-detail.util.test.ts           # utility test
```

**File Naming Convention:**

- Components: `component-name.test.tsx`
- Hooks: `hook-name.test.ts`
- Utilities: `util-name.test.ts`
- Integration tests: `feature-name.integration.test.tsx`

### Testing Patterns

**Component Testing:**

```typescript
import { render, screen } from '@/utils/test-utils'
import { PokemonCard } from './pokemon-card'
import { vi } from 'vitest'

describe('PokemonCard', () => {
  it('displays pokemon information', async () => {
    const pokemon = { id: 1, name: 'pikachu', image: 'pikachu.png' }
    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText('#001')).toBeInTheDocument()
  })
})
```

**Custom Hook Testing:**

```typescript
import { renderHook } from '@testing-library/react'
import { usePokemonSpecies } from './pokemon-detail.hook'

describe('usePokemonSpecies', () => {
  it('returns pokemon species data', () => {
    const { result } = renderHook(() => usePokemonSpecies(1))
    expect(result.current.isLoading).toBe(false)
  })
})
```

**Architectural Context:** These patterns implement our [HTTP Service Architecture](ARCHITECTURE.md#http-service-architecture) adapter pattern design.

---

## Development Workflow

### Branch Naming

```bash
# with card/ticket number
card-123_pokemon-search-feature

# without card number
jd_pokemon-detail-optimization
```

### Commit Process

```bash
git add .
git commit  # opens commitizen wizard
```

**Pre-commit Validation:**

1. typescript compilation
2. test suite execution
3. eslint validation
4. prettier formatting
5. commit message validation

### HTTP Service Usage

**REST API:**

```typescript
import { httpService } from '@/services/http'

// typed requests
const pokemons = await httpService.get<IPokemon[]>('/pokemons')
const pokemon = await httpService.get<IPokemon>('/pokemon/pikachu')

// error handling
try {
  const pokemonData = await httpService.get<IPokemon>('/pokemon/1')
} catch (error) {
  console.error(error.message, error.status)
}
```

**GraphQL:**

```typescript
import { graphqlService } from '@/services/http'

const { data } = await graphqlService.request<{ pokemons: IPokemon[] }>(
  GET_POKEMONS_QUERY,
  { limit: 20 },
)
```

---

## Configuration Reference

### TypeScript Setup

**tsconfig.json key settings:**

- strict mode enabled
- `@/` path alias configured
- vitest global types included

### Testing Setup

**vitest.config.ts configuration:**

- jsdom environment
- coverage thresholds: 80%
- test file patterns: `*.test.tsx`
- setup file: `vitest.setup.ts`

### Code Quality

**eslint.config.mjs rules:**

- no `any` types
- explicit return types
- import sorting
- prettier integration

---

## Troubleshooting

### TypeScript Issues

**module resolution errors with path aliases:**

```bash
# restart typescript service
cmd + shift + p -> "TypeScript: Restart TS Server"

# verify tsconfig.json paths configuration
"paths": { "@/*": ["./*"] }
```

**strict type checking violations:**

- define explicit typescript interfaces for all data structures
- reference type definitions: `app/views/pokemon-detail/pokemon-detail.type.ts`
- check eslint configuration: `eslint.config.mjs` - typescript rules

### Testing Issues

**test discovery failures:**

```bash
# verify test file naming
component-name.test.tsx  ✓
component-name.spec.tsx  ✓

# check vitest.config.ts setup
test: { environment: 'jsdom' }
```

**async test timeouts:**

- use `waitFor` utility for asynchronous operations
- implement proper api call mocking strategies with `vi.mock`
- verify tanstack query test setup and configuration

### Development Environment

**development server issues:**

```bash
# port conflicts
npm run dev -- --port 3001

# cache issues
rm -rf .next
npm run dev
```

---

## Next Steps

**For system architecture:** see [Architecture Guide](ARCHITECTURE.md) for design patterns and data flow.

**For project setup:** return to [README](../README.md) for installation and quick start.

**For examples:** examine `app/views/pokemon-detail/` for complete implementation patterns including hooks, utils, and component structure.
