# Naming Conventions

Standardized naming patterns and conventions ensuring codebase consistency and maintainability.

## file and directory naming

### directory naming

directories use lowercase with hyphens for multi-word names:

```
app/
├── components/
├── views/
├── services/
├── stores/
├── utils/
└── (routes)/
    ├── (public)/
    └── (protected)/
```

multi-word directory examples:

- tech-radar/
- pokemon-species-info/
- user-profile-settings/
- api-integration-tests/

### file naming patterns

#### component files

react components follow kebab-case with descriptive extensions:

```
spinner.tsx                      # main component implementation
spinner.type.ts                  # typescript interfaces
spinner.const.ts                 # constants and configurations
spinner.test.tsx                 # component tests
spinner.hook.ts                  # custom hooks
spinner.hook.test.ts            # hook tests
index.ts                        # clean export barrel
```

#### page and route files

next.js routing files use reserved names with specific purposes:

```
page.tsx                        # route page component
layout.tsx                      # route layout wrapper
loading.tsx                     # route loading component
error.tsx                       # route error boundary
not-found.tsx                   # 404 error component
```

#### utility and service files

utility and service files use descriptive names with purpose indication:

```
date.util.ts                    # date formatting utilities
form.util.ts                   # form validation helpers
rest.client.ts                 # rest api client service
graphql.client.ts              # graphql client service
pokemon.store.ts               # pokemon state management
auth.store.ts                  # authentication store
```

#### configuration files

configuration files follow tool-specific naming conventions:

```
package.json                    # npm package configuration
tsconfig.json                  # typescript compiler settings
eslint.config.mjs              # eslint configuration
prettier.config.mjs            # prettier formatting rules
tailwind.config.ts             # tailwind css configuration
next.config.mjs                # next.js framework settings
vitest.config.mts              # vitest testing configuration
```

## typescript naming conventions

### interface naming

interfaces use descriptive names with 'I' prefix for distinction:

```typescript
// component props interfaces
interface ISpinnerProps {
  size?: TSpinnerSize
  color?: TSpinnerColor
  text?: string
  className?: string
}

// service interfaces
interface IRestHttpAdapter {
  request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse>
  readonly name: string
}

// data structure interfaces
interface IPokemonSpecies {
  id: number
  name: string
  evolutionChain: string
  habitat: string
}
```

### type alias naming

type aliases use 'T' prefix for clear identification:

```typescript
// union types
type TSpinnerSize = 'sm' | 'md' | 'lg'
type TSpinnerColor = 'blue' | 'gray' | 'green' | 'purple' | 'red'
type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// function types
type TRestAdapterFactory = () => IRestHttpAdapter
type TGraphQLAdapterFactory = () => IGraphQLHttpAdapter

// generic constraint types
type TApiResponse<TData> = {
  data: TData
  status: number
  message?: string
}
```

### enum naming

enums use PascalCase with descriptive context:

```typescript
// status enums
enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

// configuration enums
enum ApiEndpoints {
  Pokemon = '/pokemon',
  Species = '/pokemon-species',
  Evolution = '/evolution-chain',
}
```

## component naming patterns

### react component naming

components use PascalCase with clear, descriptive names:

```typescript
// ui components
const Spinner: React.FC<ISpinnerProps> = ({ size, color }) => {
  return <div className={spinnerClasses}>Loading...</div>
}

// layout components
const Header: React.FC = () => {
  return <header>navigation content</header>
}

// feature components
const TechRadar: React.FC<IRadarConfig> = ({ config }) => {
  return <div id="radar">radar visualization</div>
}

// page components
const HomePage: React.FC = () => {
  return <main>home page content</main>
}
```

### component export patterns

components export using consistent patterns:

```typescript
// default export for primary component
export default Spinner

// named exports for secondary utilities
export { SpinnerSize, SpinnerColor } from './spinner.const'
export type { ISpinnerProps, TSpinnerSize } from './spinner.type'

// barrel exports in index files
export { default } from './spinner'
```

## hook naming conventions

### custom hook naming

custom hooks start with 'use' prefix and describe functionality:

```typescript
// data fetching hooks
const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: () => fetchPokemonSpecies(id),
  })
}

// state management hooks
const useAuth = () => {
  return useAuthStore((state) => ({
    user: state.user,
    login: state.login,
    logout: state.logout,
  }))
}

// utility hooks
const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // hook implementation
}
```

### hook test naming

hook tests follow descriptive naming patterns:

```typescript
describe('usePokemonSpecies', () => {
  describe('Loading States', () => {
    it('should return loading state initially', () => {
      // test implementation
    })
  })

  describe('Error Handling', () => {
    it('should handle api errors gracefully', () => {
      // test implementation
    })
  })
})
```

## variable and function naming

### variable naming

variables use camelCase with descriptive, contextual names:

```typescript
// primitive variables
const isLoading = true
const errorMessage = 'failed to fetch data'
const totalCount = 150
const apiBaseUrl = 'https://api.example.com'

// object variables
const userProfile = {
  name: 'john doe',
  email: 'john@example.com',
}

const apiResponse = {
  data: pokemonData,
  status: 200,
  message: 'success',
}

// array variables
const pokemonList = []
const validationErrors = []
const queryParameters = []
```

### function naming

functions use camelCase with verb-based descriptive names:

```typescript
// utility functions
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// api functions
const fetchPokemonSpecies = async (id: number): Promise<IPokemonSpecies> => {
  const response = await restClient.get(`/pokemon-species/${id}`)
  return response.data
}

// event handlers
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault()
  // form submission logic
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}
```

## constant naming patterns

### module-level constants

constants use UPPER_SNAKE_CASE for module-level definitions:

```typescript
// configuration constants
const API_BASE_URL = 'https://pokeapi.co/api/v2'
const DEFAULT_PAGE_SIZE = 20
const CACHE_DURATION_MINUTES = 30

// query key constants
const POKEMON_SPECIES_QUERY_KEY = 'pokemon-species'
const POKEMON_LIST_QUERY_KEY = 'pokemon-list'

// route constants
const PUBLIC_ROUTES = ['/home', '/about', '/contact']
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']
```

### component constants

component-specific constants follow similar patterns:

```typescript
// component configuration objects
const SPINNER_SIZE_CLASSES: Record<TSpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const SPINNER_COLOR_CLASSES: Record<TSpinnerColor, string> = {
  blue: 'border-blue-400',
  gray: 'border-gray-400',
  green: 'border-green-400',
}
```

## css class naming

### tailwind css patterns

tailwind classes follow utility-first naming with consistent organization:

```typescript
// responsive design patterns
const responsiveClasses = 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4'

// state-based classes
const interactiveClasses = 'hover:bg-blue-500 focus:ring-2 focus:ring-blue-300'

// component-specific classes
const cardClasses = 'bg-white rounded-lg shadow-md p-6 border border-gray-200'

// layout classes
const flexClasses = 'flex items-center justify-between gap-4'
```

### custom css classes

custom css classes use kebab-case with bem-inspired patterns:

```css
/* component block classes */
.tech-radar {
}
.pokemon-card {
}
.navigation-menu {
}

/* element classes */
.tech-radar__legend {
}
.pokemon-card__image {
}
.navigation-menu__item {
}

/* modifier classes */
.pokemon-card--featured {
}
.navigation-menu--mobile {
}
.tech-radar--interactive {
}
```

## api and endpoint naming

### rest api conventions

rest endpoints follow restful naming patterns:

```typescript
// resource-based endpoints
const API_ENDPOINTS = {
  POKEMON: '/pokemon',
  POKEMON_SPECIES: '/pokemon-species',
  EVOLUTION_CHAIN: '/evolution-chain',
} as const

// specific resource access
const getPokemonById = (id: number) => `/pokemon/${id}`
const getPokemonSpeciesById = (id: number) => `/pokemon-species/${id}`
```

### graphql naming

graphql operations use descriptive, action-based names:

```typescript
// query operations
const GET_POKEMON_SPECIES = `
  query GetPokemonSpecies($id: ID!) {
    pokemonSpecies(id: $id) {
      id
      name
      evolutionChain
    }
  }
`

// mutation operations
const CREATE_USER_PROFILE = `
  mutation CreateUserProfile($input: UserProfileInput!) {
    createUserProfile(input: $input) {
      id
      name
      email
    }
  }
`
```

## test naming conventions

### test file organization

test files mirror source structure with descriptive test names:

```typescript
// component tests
describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {})
    it('should apply size classes correctly', () => {})
  })

  describe('Interaction', () => {
    it('should handle color prop changes', () => {})
  })
})

// hook tests
describe('usePokemonSpecies Hook', () => {
  describe('Data Fetching', () => {
    it('should fetch species data successfully', () => {})
    it('should handle loading states correctly', () => {})
  })

  describe('Error Handling', () => {
    it('should retry failed requests appropriately', () => {})
  })
})
```

### test utility naming

test utilities and mocks use clear, purpose-driven names:

```typescript
// mock functions
const mockPokemonSpecies = {
  id: 25,
  name: 'pikachu',
  evolutionChain: 'pichu-pikachu-raichu',
}

// test utilities
const renderWithProviders = (component: React.ReactElement) => {
  return render(component, { wrapper: TestProviders })
}

const createMockApiResponse = <T>(data: T) => ({
  data,
  status: 200,
  message: 'success',
})
```

## consistency enforcement

### automated tooling

naming conventions are enforced through:

- eslint rules for variable and function naming
- typescript compiler for interface and type consistency
- prettier for file formatting standards
- custom eslint plugins for project-specific patterns

### documentation standards

naming convention adherence is supported by:

- inline comments explaining naming rationale
- jsdoc documentation for public interfaces
- code review checklists including naming verification
- automated documentation generation from well-named code
