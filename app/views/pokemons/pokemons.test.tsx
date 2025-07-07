import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ViewPokemons } from './pokemons'
import { POKEMON_GALLERY_CONFIG } from './pokemons.const'
import type { IPokemonsViewProps } from './pokemons.type'

vi.mock('./pokemons.hook', () => {
  return {
    useMorePokemons: vi.fn(),
  }
})

vi.mock('./components/pokemon-search', () => {
  return {
    PokemonSearch: vi.fn(),
    usePokemonNameSearch: vi.fn(),
  }
})

vi.mock('./components/pokemon-card', () => {
  return {
    PokemonCard: vi.fn(),
  }
})

vi.mock('@/app/components/ui/spinner', () => {
  return {
    Spinner: vi.fn(),
  }
})

import { Spinner } from '@/app/components/ui/spinner'

import { PokemonCard } from './components/pokemon-card'
import {
  PokemonSearch,
  usePokemonNameSearch,
} from './components/pokemon-search'
import { useMorePokemons } from './pokemons.hook'

const mockedUseMorePokemons = vi.mocked(useMorePokemons)
const mockedUsePokemonNameSearch = vi.mocked(usePokemonNameSearch)
const mockedPokemonSearch = vi.mocked(PokemonSearch)
const mockedPokemonCard = vi.mocked(PokemonCard)
const mockedSpinner = vi.mocked(Spinner)

describe('ViewPokemons Component', () => {
  const mockPokemonData = [
    {
      name: 'pikachu',
      image: 'https://example.com/pikachu.png',
      url: '/pokemons/pikachu',
    },
    {
      name: 'charizard',
      image: 'https://example.com/charizard.png',
      url: '/pokemons/charizard',
    },
  ]

  const defaultProps: IPokemonsViewProps = {
    success: true,
    data: mockPokemonData,
    count: 100,
    previous: null,
  }

  const mockFetchNextPage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockedUseMorePokemons.mockReturnValue({
      data: undefined,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    } as unknown as ReturnType<typeof useMorePokemons>)

    mockedUsePokemonNameSearch.mockReturnValue({
      result: undefined,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })

    mockedPokemonSearch.mockImplementation(({ onSearch, isLoading }) => {
      return (
        <div data-testid='pokemon-search'>
          <input
            data-testid='search-input'
            onChange={(e) => {
              return onSearch(e.target.value)
            }}
            placeholder='Search Pokemon'
          />
          {isLoading && <div data-testid='search-loading'>Loading...</div>}
        </div>
      )
    })

    mockedPokemonCard.mockImplementation(({ pokemon }) => {
      return (
        <div data-testid='pokemon-card'>
          <div data-testid='pokemon-name'>{pokemon.name}</div>
          <div data-testid='pokemon-image'>{pokemon.image}</div>
        </div>
      )
    })

    mockedSpinner.mockImplementation(({ text }) => {
      return (
        <div data-testid='spinner'>
          ({text && <span data-testid='spinner-text'>{text}</span>})
        </div>
      )
    })
  })

  describe('Error State', () => {
    it('should render error state when success is false', () => {
      const errorProps = {
        ...defaultProps,
        success: false,
        error: 'Network error',
      }

      render(<ViewPokemons {...errorProps} />)

      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.ERROR_TITLE),
      ).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.ERROR_MESSAGE),
      ).toBeInTheDocument()
      expect(screen.getByText('Network error')).toBeInTheDocument()
      expect(screen.getByText('⚠️')).toBeInTheDocument()
    })

    it('should render error state without error message when not provided', () => {
      const errorProps = {
        ...defaultProps,
        success: false,
      }

      render(<ViewPokemons {...errorProps} />)

      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.ERROR_TITLE),
      ).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.ERROR_MESSAGE),
      ).toBeInTheDocument()
      expect(screen.queryByText('Network error')).not.toBeInTheDocument()
    })
  })

  describe('Success State', () => {
    it('should render main content when success is true', () => {
      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getByText(POKEMON_GALLERY_CONFIG.TITLE)).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.SUBTITLE),
      ).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.BADGE_TEXT),
      ).toBeInTheDocument()
      expect(screen.getByText('GraphQL PokeAPI')).toBeInTheDocument()
    })

    it('should render pokemon cards from data', () => {
      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2)
      expect(screen.getByText('pikachu')).toBeInTheDocument()
      expect(screen.getByText('charizard')).toBeInTheDocument()
    })

    it('should render search component', () => {
      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getByTestId('pokemon-search')).toBeInTheDocument()
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    it('should render cache and server information', () => {
      render(<ViewPokemons {...defaultProps} />)

      expect(
        screen.getByText(`Cache: ${POKEMON_GALLERY_CONFIG.CACHE_DURATION}`),
      ).toBeInTheDocument()
      expect(screen.getByText('Server-side rendered')).toBeInTheDocument()
      expect(screen.getByText('Client-side pagination')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('should show search loading state when searching', () => {
      mockedUsePokemonNameSearch.mockReturnValue({
        result: undefined,
        isLoading: true,
        error: null,
        refetch: vi.fn(),
      })

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'pika' },
      })

      expect(screen.getByTestId('search-loading')).toBeInTheDocument()
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
      expect(screen.getByText('Searching...')).toBeInTheDocument()
    })

    it('should display search results when found', () => {
      const searchResult = {
        id: 25,
        name: 'pikachu',
        sprites: {
          front_default: 'https://example.com/pikachu.png',
        },
        species: {
          name: 'pikachu',
          url: 'https://example.com/species/25',
        },
        types: [
          {
            type: {
              name: 'electric',
            },
          },
        ],
      }

      mockedUsePokemonNameSearch.mockReturnValue({
        result: searchResult,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      })

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'pikachu' },
      })

      const pokemonCards = screen.getAllByTestId('pokemon-card')
      expect(pokemonCards).toHaveLength(1)
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    })

    it('should show search error when pokemon not found', () => {
      const searchError = new Error('Pokemon not found')

      mockedUsePokemonNameSearch.mockReturnValue({
        result: undefined,
        isLoading: false,
        error: searchError,
        refetch: vi.fn(),
      })

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'invalid' },
      })

      expect(screen.getByText('Pokemon not found')).toBeInTheDocument()
    })
  })

  describe('Load More Functionality', () => {
    it('should show load more button when hasNextPage is true', () => {
      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getByText('Show more pokemons')).toBeInTheDocument()
    })

    it('should show load more button when data length is between 8 and count', () => {
      const propsWithMoreData = {
        ...defaultProps,
        data: new Array(10).fill(null).map((_, i) => {
          return {
            name: `pokemon-${i}`,
            image: `https://example.com/pokemon-${i}.png`,
            url: `/pokemons/pokemon-${i}`,
          }
        }),
      }

      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...propsWithMoreData} />)

      expect(screen.getByText('Show more pokemons')).toBeInTheDocument()
    })

    it('should call fetchNextPage when load more button is clicked', () => {
      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.click(screen.getByText('Show more pokemons'))

      expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
    })

    it('should show loading state when fetching next page', () => {
      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getByText('Loading more...')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should not show load more button when searching', () => {
      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      const searchResult = {
        id: 25,
        name: 'pikachu',
        sprites: { front_default: 'test.png' },
        species: { name: 'pikachu', url: 'test' },
        types: [{ type: { name: 'electric' } }],
      }

      mockedUsePokemonNameSearch.mockReturnValue({
        result: searchResult,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      })

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'pika' },
      })

      expect(screen.queryByText('Show more pokemons')).not.toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('should show no results message when no pokemons are found', () => {
      const emptyProps = {
        ...defaultProps,
        data: [],
      }

      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...emptyProps} />)

      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.NO_RESULTS_MESSAGE),
      ).toBeInTheDocument()
      expect(screen.getByText('🔍')).toBeInTheDocument()
    })

    it('should show no results message when search returns empty', () => {
      mockedUsePokemonNameSearch.mockReturnValue({
        result: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      })

      render(<ViewPokemons {...defaultProps} />)

      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'nonexistent' },
      })

      expect(
        screen.getByText(POKEMON_GALLERY_CONFIG.NO_RESULTS_MESSAGE),
      ).toBeInTheDocument()
    })
  })

  describe('Infinite Query Integration', () => {
    it('should display pokemons from infinite query data', () => {
      const infiniteData = {
        pages: [
          {
            data: [
              {
                name: 'bulbasaur',
                image: 'https://example.com/bulbasaur.png',
                url: '/pokemons/bulbasaur',
              },
            ],
          },
        ],
        pageParams: [8],
      }

      mockedUseMorePokemons.mockReturnValue({
        data: infiniteData,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(3)
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })

    it('should handle empty infinite query data', () => {
      mockedUseMorePokemons.mockReturnValue({
        data: undefined,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
      } as unknown as ReturnType<typeof useMorePokemons>)

      render(<ViewPokemons {...defaultProps} />)

      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2)
    })
  })
})
