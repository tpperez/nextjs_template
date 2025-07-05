# Development Guide

**Navigation:** [README](../README.md) | [Architecture Guide](ARCHITECTURE.md)

---

## Overview

Daily development patterns, coding conventions, and implementation guidelines for contributors working on the codebase. For project setup and contribution guidelines, see the [README](../README.md).

---

## Code Organization

### Directory and Suffix Convention

**Rule:** Typed directories (plural) = no suffix. Modules = with suffix.

```bash
# Typed directories - NO suffix
app/components/ui/button.tsx                       ✅
app/utils/format-date.ts                          ✅
app/services/pokemon-api.ts                       ✅

# Modules - WITH suffix (only files that exist)
app/views/pokemon-detail/pokemon-detail.tsx       ✅  # required
app/views/pokemon-detail/pokemon-detail.hook.ts   ✅  # if needed
app/views/pokemon-detail/pokemon-detail.type.ts   ✅  # if types exist
app/(routes)/pokemon/queries/get-pokemon.query.ts ✅  # required
```

**Why:** Directory name already indicates file type in typed directories. Suffixes needed in modules for clarity when multiple file types coexist.

### Module Structure Patterns

**View Module:**

```bash
app/views/pokemon-detail/
├── index.ts                    # public exports
├── pokemon-detail.tsx          # main component
├── pokemon-detail.type.ts      # component types
├── pokemon-detail.hook.ts      # client-side data fetching
└── components/                 # view-specific components
    └── pokemon-moves.tsx
```

**Route Module:**

```bash
app/(routes)/(public)/pokemon/[id]/
├── page.tsx                    # route component
├── loading.tsx                 # loading UI
├── error.tsx                   # error boundary
└── queries/                    # server-side data fetching
    ├── get-pokemon-detail.query.ts
    └── get-pokemon-detail.type.ts
```

---

## Implementation Patterns

### Data Fetching Implementation

**Server-Side (Route Queries):**

```typescript
// app/(routes)/pokemon/[id]/queries/get-pokemon-detail.query.ts
export const getPokemonDetailData = async (
  name: string,
): Promise<DataResult<IPokemonDetail>> => {
  try {
    const pokemon = await restClient.get<IPokemonDetail>(`/pokemon/${name}`)
    return { success: true, data: pokemon }
  } catch (error) {
    return { success: false, error: handleAPIError(error) }
  }
}
```

**Client-Side (View Hooks):**

```typescript
// app/views/pokemon-detail/pokemon-detail.hook.ts
export const usePokemonSpecies = (pokemonId: number) => {
  return useQuery({
    queryKey: [POKEMON_DETAIL_QUERY_KEY, 'species', pokemonId],
    queryFn: () => fetchPokemonSpecies(pokemonId),
    staleTime: 5 * 60 * 1000,    # 5 minutes
    retry: (failureCount, error) => {
      if (error.status === 404) return false
      return failureCount < 3
    }
  })
}
```

### HTTP Service Usage

**REST Implementation:**

```typescript
import { httpService } from '@/services/http'

// basic requests
const pokemon = await httpService.get<IPokemon>('/pokemon/pikachu')
const newPokemon = await httpService.post<IPokemon>('/pokemon', data)

// with caching options
const pokemonData = await httpService.get<IPokemon>('/pokemon/1', {
  cache: 'force-cache',
  next: { revalidate: 3600 },
})
```

**GraphQL Implementation:**

```typescript
import { graphqlService } from '@/services/http'

const { data } = await graphqlService.request<{ pokemons: IPokemon[] }>(
  GET_POKEMONS_QUERY,
  { limit: 20 },
  { cache: 'no-cache' },
)
```

### Component Implementation

**View Component Pattern:**

```typescript
// pokemon-detail.tsx
interface ViewPokemonDetailProps {
  data: IPokemonDetail
}

export const ViewPokemonDetail = ({ data: pokemon }: ViewPokemonDetailProps) => {
  // client-side data fetching
  const { species, isLoading } = usePokemonSpecies(pokemon.id)

  return (
    <div>
      <h1>{pokemon.name}</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <SpeciesInfo species={species} />
      )}
    </div>
  )
}
```

**Route Component Pattern:**

```typescript
// page.tsx
interface PokemonDetailPageProps {
  params: { id: string }
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const result = await getPokemonDetailData(params.id)

  if (!result.success) {
    notFound()
  }

  return <ViewPokemonDetail data={result.data} />
}
```

---

## Testing Implementation

### Component Testing

```typescript
// pokemon-card.test.tsx
import { render, screen } from '@/utils/test-utils'
import { PokemonCard } from './pokemon-card'

describe('PokemonCard', () => {
  const mockPokemon: IPokemon = {
    id: 1,
    name: 'pikachu',
    sprites: { front_default: 'pikachu.png' },
    types: [{ type: { name: 'electric' } }]
  }

  it('renders pokemon information with accessibility attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} />)

    expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument()
    expect(screen.getByText('#001')).toBeInTheDocument()
    expect(screen.getByLabelText('Pokemon type: electric')).toBeInTheDocument()
  })
})
```

### Hook Testing

```typescript
// pokemon-detail.hook.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { createQueryWrapper } from '@/utils/test-utils'
import { usePokemonSpecies } from './pokemon-detail.hook'

describe('usePokemonSpecies', () => {
  it('fetches species data with proper configuration', async () => {
    const { result } = renderHook(() => usePokemonSpecies(1), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toMatchObject({
      color: expect.any(String),
      habitat: expect.any(String),
    })
  })
})
```

### API Query Testing

```typescript
// get-pokemon-detail.query.test.ts
import { vi } from 'vitest'
import { getPokemonDetailData } from './get-pokemon-detail.query'
import * as httpService from '@/services/http'

vi.mock('@/services/http')

describe('getPokemonDetailData', () => {
  it('transforms API response correctly', async () => {
    const mockResponse = { id: 1, name: 'pikachu', base_experience: 112 }
    vi.mocked(httpService.restClient.get).mockResolvedValue(mockResponse)

    const result = await getPokemonDetailData('pikachu')

    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      id: 1,
      name: 'pikachu',
      baseExperience: 112  # camelCase transformation
    })
  })

  it('handles errors properly', async () => {
    vi.mocked(httpService.restClient.get).mockRejectedValue(
      new Error('Pokemon not found')
    )

    const result = await getPokemonDetailData('invalid')

    expect(result.success).toBe(false)
    expect(result.error.type).toBe('API_ERROR')
  })
})
```

### Testing Best Practices

- **Co-locate tests** with implementation files
- **Test user interactions**, not implementation details
- **Use accessibility-first queries** (`getByRole`, `getByLabelText`)
- **Mock external dependencies** with `vi.mock()`
- **Use `waitFor`** for asynchronous operations
- **Maintain 80% coverage** threshold

---

## TypeScript Conventions

### Type Definition Patterns

```typescript
// pokemon-detail.type.ts
export interface IPokemonDetail {
  id: number
  name: string
  baseExperience: number
  sprites: {
    front_default: string
  }
  types: Array<{
    type: { name: string }
  }>
}

export interface ViewPokemonDetailProps {
  data: IPokemonDetail
}

export type TUsePokemonSpeciesReturn = UseQueryResult<IPokemonSpecies, Error>
```

### Import Organization

ESLint automatically organizes imports in this order:

1. React and framework imports
2. External libraries
3. Internal imports (`@/` alias)
4. Relative imports
5. CSS and style imports

```typescript
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { httpService } from '@/services/http'
import { POKEMON_DETAIL_CONFIG } from './pokemon-detail.const'
import './pokemon-detail.css'
```

---

## Quick Reference

### Creating New Features

**1. Add Route:**

```bash
app/(routes)/(public)/pokemon/[id]/
├── page.tsx                    # route component
└── queries/get-pokemon.query.ts # server data
```

**2. Create View:**

```bash
app/views/pokemon-detail/
├── pokemon-detail.tsx          # main component
├── pokemon-detail.hook.ts      # client data
└── pokemon-detail.type.ts      # types
```

**3. Add Tests:**

```bash
pokemon-detail.test.tsx         # component tests
pokemon-detail.hook.test.ts     # hook tests
get-pokemon.query.test.ts       # query tests
```

### Common Patterns

**Query Hook:**

```typescript
export const usePokemon = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    staleTime: 5 * 60 * 1000,
  })
}
```

**Server Query:**

```typescript
export const getPokemon = async (id: string): Promise<DataResult<IPokemon>> => {
  try {
    const data = await httpService.get<IPokemon>(`/pokemon/${id}`)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: handleAPIError(error) }
  }
}
```

---

## Next Steps

**For architectural decisions:** see [Architecture Guide](ARCHITECTURE.md) for design patterns and performance strategies.

**For project setup:** return to [README](../README.md) for installation and contribution guidelines.

**For implementation examples:** examine `app/views/pokemon-detail/` for complete feature patterns.
