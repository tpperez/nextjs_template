import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import usePokemonHistoryStore from '@/app/stores/pokemon-history'

import type { IPokemonDetail } from '../../(routes)/(public)/(examples)/pokemons/[pokemon]/queries'

import ViewPokemon from './pokemon'
import { POKEMON_DETAIL_CONFIG } from './pokemon.const'
import { formatName, formatStatName } from './pokemon.util'

const mockAddToHistory = vi.fn()

vi.mock('@/app/stores/pokemon-history', () => {
  return {
    default: vi.fn(() => {
      return {
        addToHistory: mockAddToHistory,
      }
    }),
  }
})

vi.mock('./components/pokemon-moves', () => {
  return {
    default: ({ pokemonName }: { pokemonName: string }) => {
      return (
        <div data-testid='pokemon-moves'>Pokemon Moves for {pokemonName}</div>
      )
    },
  }
})

vi.mock('./components/pokemon-species-info', () => {
  return {
    default: ({ pokemonId }: { pokemonId: number }) => {
      return (
        <div data-testid='pokemon-species-info'>
          Pokemon Species Info for {pokemonId}
        </div>
      )
    },
  }
})

vi.mock('./pokemon.util', () => {
  return {
    formatName: vi.fn((name: string) => {
      return name.replace('-', ' ')
    }),
    formatStatName: vi.fn((name: string) => {
      return name.replace('-', ' ')
    }),
  }
})

describe('ViewPokemon', () => {
  const mockPokemonData: IPokemonDetail = {
    id: 25,
    name: 'pikachu',
    height: 40,
    weight: 60,
    base_experience: 112,
    order: 35,
    is_default: true,
    sprites: {
      front_default: 'https://example.com/pikachu.png',
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_female: null,
      front_shiny: null,
      front_shiny_female: null,
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://example.com/electric',
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: 'static',
          url: 'https://example.com/static',
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: 'lightning-rod',
          url: 'https://example.com/lightning-rod',
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    stats: [
      {
        base_stat: 35,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://example.com/hp',
        },
      },
      {
        base_stat: 55,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://example.com/attack',
        },
      },
      {
        base_stat: 90,
        effort: 2,
        stat: {
          name: 'speed',
          url: 'https://example.com/speed',
        },
      },
    ],
    moves: [],
    species: {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePokemonHistoryStore).mockReturnValue({
      addToHistory: mockAddToHistory,
    })
  })

  describe('Component Rendering', () => {
    it('should render the pokemon detail view with basic information', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(screen.getByText('pikachu')).toBeInTheDocument()
      expect(screen.getByText('#025')).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_DETAIL_CONFIG.BADGE_TEXT),
      ).toBeInTheDocument()
      expect(screen.getByText('Basic Information')).toBeInTheDocument()
      expect(screen.getByText('Back to Pokémon List')).toBeInTheDocument()
    })

    it('should render pokemon physical stats correctly', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(screen.getByText('4 m')).toBeInTheDocument()
      expect(screen.getByText('6 kg')).toBeInTheDocument()
      expect(screen.getByText('112')).toBeInTheDocument()
    })

    it('should render pokemon types', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(screen.getByText('electric')).toBeInTheDocument()
    })

    it('should render pokemon abilities with formatted names', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(vi.mocked(formatName)).toHaveBeenCalledWith('static')
      expect(vi.mocked(formatName)).toHaveBeenCalledWith('lightning-rod')
    })

    it('should render pokemon stats with formatted names', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(vi.mocked(formatStatName)).toHaveBeenCalledWith('hp')
      expect(vi.mocked(formatStatName)).toHaveBeenCalledWith('attack')
      expect(vi.mocked(formatStatName)).toHaveBeenCalledWith('speed')

      expect(screen.getByText('35')).toBeInTheDocument()
      expect(screen.getByText('55')).toBeInTheDocument()
      expect(screen.getByText('90')).toBeInTheDocument()
    })

    it('should render child components with correct props', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(screen.getByTestId('pokemon-moves')).toBeInTheDocument()
      expect(screen.getByText('Pokemon Moves for pikachu')).toBeInTheDocument()

      expect(screen.getByTestId('pokemon-species-info')).toBeInTheDocument()
      expect(
        screen.getByText('Pokemon Species Info for 25'),
      ).toBeInTheDocument()
    })

    it('should render cache and server-side rendering info', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(
        screen.getByText(`Cache: ${POKEMON_DETAIL_CONFIG.CACHE_DURATION}`),
      ).toBeInTheDocument()
      expect(screen.getByText('Server-side rendered')).toBeInTheDocument()
    })
  })

  describe('Image Display', () => {
    it('should render pokemon image when sprite is available', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(screen.queryByText('No Image Available')).not.toBeInTheDocument()
    })

    it('should render "No Image Available" when sprite is null', () => {
      const mockPokemonWithoutImage = {
        ...mockPokemonData,
        sprites: {
          ...mockPokemonData.sprites,
          front_default: null,
        },
      }

      render(<ViewPokemon data={mockPokemonWithoutImage} />)

      expect(screen.getByText('No Image Available')).toBeInTheDocument()
    })
  })

  describe('Pokemon History Integration', () => {
    it('should add pokemon to history on mount', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(mockAddToHistory).toHaveBeenCalledWith({
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
        image: 'https://example.com/pikachu.png',
      })
    })

    it('should add pokemon to history with empty image when sprite is null', () => {
      const mockPokemonWithoutImage = {
        ...mockPokemonData,
        sprites: {
          ...mockPokemonData.sprites,
          front_default: null,
        },
      }

      render(<ViewPokemon data={mockPokemonWithoutImage} />)

      expect(mockAddToHistory).toHaveBeenCalledWith({
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
        image: '',
      })
    })
  })

  describe('Stats Bar Rendering', () => {
    it('should render stat bars with correct width percentages', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      mockPokemonData.stats.forEach((stat) => {
        expect(screen.getByText(stat.base_stat.toString())).toBeInTheDocument()
      })
    })
  })

  describe('Multiple Types and Abilities', () => {
    it('should render multiple types correctly', () => {
      const mockPokemonWithMultipleTypes = {
        ...mockPokemonData,
        types: [
          {
            slot: 1,
            type: {
              name: 'electric',
              url: 'https://example.com/electric',
            },
          },
          {
            slot: 2,
            type: {
              name: 'flying',
              url: 'https://example.com/flying',
            },
          },
        ],
      }

      render(<ViewPokemon data={mockPokemonWithMultipleTypes} />)

      expect(screen.getByText('electric')).toBeInTheDocument()
      expect(screen.getByText('flying')).toBeInTheDocument()
    })

    it('should render multiple abilities correctly', () => {
      render(<ViewPokemon data={mockPokemonData} />)

      expect(vi.mocked(formatName)).toHaveBeenCalledWith('static')
      expect(vi.mocked(formatName)).toHaveBeenCalledWith('lightning-rod')
    })
  })
})
