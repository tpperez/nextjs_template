# Code Organization

Codebase organization, architectural patterns, and standardized naming conventions for maintainable project structure.

## project directory structure

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

## organizational patterns

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

## naming conventions

### file and directory naming

#### directory naming

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
    └── (auth)/
```

multi-word directory examples:

- tech-radar/
- pokemon-species-info/
- user-profile-settings/
- api-integration-tests/

#### file naming patterns

**component files**

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

**page and route files**

next.js routing files use reserved names with specific purposes:

```
page.tsx                        # route page component
layout.tsx                      # route layout wrapper
loading.tsx                     # route loading component
error.tsx                       # route error boundary
not-found.tsx                   # 404 error component
```

**utility and service files**

utility and service files use descriptive names with purpose indication:

```
date.util.ts                    # date formatting utilities
form.util.ts                   # form validation helpers
rest.client.ts                 # rest api client service
graphql.client.ts              # graphql client service
pokemon-species.store.ts        # pokemon state management
auth.store.ts                  # authentication store
```

**component structure hierarchy**

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

### typescript naming conventions

#### interface naming

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

#### type alias naming

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

### component naming patterns

#### react component naming

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
const PokemonSpeciesInfo: React.FC<IPokemonProps> = ({ id }) => {
  return <div>pokemon species details</div>
}

// page components
const HomePage: React.FC = () => {
  return <main>home page content</main>
}
```

#### component export patterns

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

### hook naming conventions

#### custom hook naming

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

### variable and function naming

#### variable naming

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

#### function naming

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

### constant naming patterns

#### module-level constants

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

#### component constants

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

### test naming conventions

#### test file organization

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

#### test utility naming

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

### consistency enforcement

#### automated tooling

naming conventions are enforced through:

- eslint rules for variable and function naming
- typescript compiler for interface and type consistency
- prettier for file formatting standards
- custom eslint plugins for project-specific patterns

#### documentation standards

naming convention adherence is supported by:

- inline comments explaining naming rationale
- jsdoc documentation for public interfaces
- code review checklists including naming verification
- automated documentation generation from well-named code

## file placement guide

### where to place different file types

#### component files

```
# reusable ui components
app/components/ui/button/button.tsx
app/components/ui/modal/modal.tsx

# layout and structure
app/components/structure/header/header.tsx
app/components/structure/footer/footer.tsx

# page-specific components
app/views/home/components/hero-section/hero-section.tsx
app/views/pokemon/components/pokemon-species-info/pokemon-species-info.tsx
app/views/pokemon/components/pokemon-moves/pokemon-moves.tsx
```

#### hooks and logic

```
# custom react hooks
app/hooks/useLocalStorage.ts
app/hooks/useDebounce.ts

# page-specific hooks
app/views/pokemon/hooks/usePokemonSpecies.ts
app/views/pokemon/hooks/usePokemonMovesGraphQL.ts
```

#### types and interfaces

```
# global type definitions
app/types/api.types.ts
app/types/user.types.ts

# component-specific types
app/components/ui/button/button.types.ts
app/views/pokemon/pokemon-species-info.types.ts
```

#### constants and configuration

```
# application constants
app/constants/api.constants.ts
app/constants/routes.constants.ts

# component constants
app/components/ui/spinner/spinner.constants.ts
```

#### services and api integration

```
# api clients and services
app/services/http/pokemon.service.ts
app/services/http/auth.service.ts
app/services/storage/localStorage.service.ts
```

#### state management

```
# global stores
app/stores/auth.store.ts
app/stores/theme.store.ts

# feature-specific stores
app/stores/pokemon-species.store.ts
```

#### utilities and helpers

```
# formatting utilities
app/utils/format/date.util.ts
app/utils/format/currency.util.ts

# validation utilities
app/utils/validation/form.util.ts
app/utils/validation/api.util.ts
```

#### styling files

```
# global styles
app/styles/globals.css
app/styles/variables.css

# component styles
app/components/ui/button/button.module.css
```

#### route and page files

```
# public routes
app/(routes)/(public)/page.tsx
app/(routes)/(public)/about/page.tsx

# authenticated routes
app/(routes)/(auth)/dashboard/page.tsx
app/(routes)/(auth)/profile/page.tsx

# api routes
app/(routes)/api/users/route.ts
app/(routes)/api/pokemon/route.ts
```

### decision tree for file placement

when creating a new file, ask:

1. **is it reusable across multiple pages?**

   - yes → `app/components/`, `app/hooks/`, `app/utils/`
   - no → `app/views/[feature]/`

2. **is it related to a specific feature?**

   - yes → `app/views/[feature]/`
   - no → appropriate global directory

3. **what type of file is it?**
   - component → `components/`
   - hook → `hooks/`
   - type → `types/`
   - service → `services/`
   - utility → `utils/`
   - constant → `constants/`
   - store → `stores/`

## architectural principles

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

### scalability considerations

#### feature-based organization

structure supports growth through feature modules:

- new features add directories under views/
- feature-specific components stay localized
- shared components promote reusability
- service layer scales with additional apis

#### maintenance efficiency

organization optimizes for developer productivity:

- related files stay physically close
- consistent patterns reduce cognitive load
- clear boundaries prevent coupling issues
- modular structure supports team collaboration
