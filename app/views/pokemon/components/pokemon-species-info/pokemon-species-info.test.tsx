import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ERROR_MESSAGES } from '../../pokemon.const'
import {
  formatGenderRate,
  formatName,
  getEnglishDescription,
  getEnglishGenus,
} from '../../pokemon.util'

import PokemonSpeciesInfo from './pokemon-species-info'
import usePokemonSpecies from './pokemon-species-info.hook'
import type { IPokemonSpecies } from './pokemon-species-info.type'

vi.mock('./pokemon-species-info.hook', () => {
  return {
    default: vi.fn(),
  }
})

vi.mock('@/app/components/ui/spinner', () => {
  return {
    default: ({ text }: { text: string }) => {
      return <div data-testid='spinner'>{text}</div>
    },
  }
})

vi.mock('../../pokemon.util', () => {
  return {
    formatGenderRate: vi.fn(),
    formatName: vi.fn(),
    getEnglishDescription: vi.fn(),
    getEnglishGenus: vi.fn(),
  }
})

const mockUsePokemonSpecies = vi.mocked(usePokemonSpecies)
const mockFormatGenderRate = vi.mocked(formatGenderRate)
const mockFormatName = vi.mocked(formatName)
const mockGetEnglishDescription = vi.mocked(getEnglishDescription)
const mockGetEnglishGenus = vi.mocked(getEnglishGenus)

describe('PokemonSpeciesInfo Component', () => {
  const mockPokemonId = 25
  const defaultProps = { pokemonId: mockPokemonId }

  const mockPokemonSpecies: IPokemonSpecies = {
    id: 25,
    name: 'pikachu',
    base_happiness: 50,
    capture_rate: 190,
    color: { name: 'yellow', url: 'https://example.com/yellow' },
    evolution_chain: { url: 'https://example.com/evolution' },
    flavor_text_entries: [
      {
        flavor_text:
          'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
        language: { name: 'en', url: 'https://example.com/en' },
        version: { name: 'red', url: 'https://example.com/red' },
      },
    ],
    form_descriptions: [],
    forms_switchable: false,
    gender_rate: 4,
    generation: {
      name: 'generation-i',
      url: 'https://example.com/generation-i',
    },
    growth_rate: {
      name: 'medium-fast',
      url: 'https://example.com/medium-fast',
    },
    habitat: { name: 'forest', url: 'https://example.com/forest' },
    has_gender_differences: false,
    hatch_counter: 10,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    order: 35,
    pal_park_encounters: [],
    pokedex_numbers: [],
    shape: { name: 'quadruped', url: 'https://example.com/quadruped' },
    varieties: [],
    genera: [],
  }

  const mockRefetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockFormatGenderRate.mockReturnValue('50% ♀')
    mockFormatName.mockImplementation((name) => {
      return name.replace('-', ' ')
    })
    mockGetEnglishDescription.mockReturnValue('A cute electric mouse Pokemon')
    mockGetEnglishGenus.mockReturnValue('Mouse Pokemon')
  })

  describe('Loading State', () => {
    it('should render loading spinner when fetching data', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: undefined,
        isLoading: true,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: true,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Species Information')).toBeInTheDocument()
      expect(screen.getByText('Client-side')).toBeInTheDocument()
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
      expect(
        screen.getByText('Loading species information...'),
      ).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should render error message when there is an error', () => {
      const errorMessage = 'Network error occurred'
      mockUsePokemonSpecies.mockReturnValue({
        species: undefined,
        isLoading: false,
        isError: true,
        error: new Error(errorMessage),
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Species Information')).toBeInTheDocument()
      expect(screen.getByText('⚠️')).toBeInTheDocument()
      expect(
        screen.getByText(ERROR_MESSAGES.SPECIES_FAILED),
      ).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(screen.getByText(ERROR_MESSAGES.RETRY_TEXT)).toBeInTheDocument()
    })

    it('should render default error message when error has no message', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: undefined,
        isLoading: false,
        isError: true,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(
        screen.getByText(ERROR_MESSAGES.SPECIES_FAILED),
      ).toBeInTheDocument()
      expect(screen.getByText(ERROR_MESSAGES.UNKNOWN_ERROR)).toBeInTheDocument()
    })

    it('should call refetch when retry button is clicked', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Network error'),
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      const retryButton = screen.getByText(ERROR_MESSAGES.RETRY_TEXT)
      fireEvent.click(retryButton)

      expect(mockRefetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('No Data State', () => {
    it('should render nothing when species is undefined and no error', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: undefined,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      const { container } = render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('Success State', () => {
    it('should render species information successfully', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Species Information')).toBeInTheDocument()
      expect(screen.getByText('✅ REST Client-side')).toBeInTheDocument()

      expect(mockGetEnglishDescription).toHaveBeenCalledWith(mockPokemonSpecies)
      expect(mockGetEnglishGenus).toHaveBeenCalledWith(mockPokemonSpecies)
    })

    it('should display description when available', () => {
      mockGetEnglishDescription.mockReturnValue('A cute electric mouse Pokemon')

      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(
        screen.getByText('A cute electric mouse Pokemon'),
      ).toBeInTheDocument()
    })

    it('should display genus when available', () => {
      mockGetEnglishGenus.mockReturnValue('Mouse Pokemon')

      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Category')).toBeInTheDocument()
      expect(screen.getByText('Mouse Pokemon')).toBeInTheDocument()
    })

    it('should display all stat cards', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.getByText('Capture Rate')).toBeInTheDocument()
      expect(screen.getByText('190')).toBeInTheDocument()
      expect(screen.getByText('Higher = Easier')).toBeInTheDocument()

      expect(screen.getByText('Base Happiness')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('Starting friendship')).toBeInTheDocument()

      expect(screen.getByText('Gender Rate')).toBeInTheDocument()
      expect(screen.getByText('50% ♀')).toBeInTheDocument()
      expect(screen.getByText('Female ratio')).toBeInTheDocument()

      expect(screen.getByText('Hatch Counter')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('Egg cycles')).toBeInTheDocument()
    })

    it('should not display habitat when not available', () => {
      const speciesWithoutHabitat = { ...mockPokemonSpecies, habitat: null }

      mockUsePokemonSpecies.mockReturnValue({
        species: speciesWithoutHabitat,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.queryByText('Habitat')).not.toBeInTheDocument()
    })

    it('should not display description when not available', () => {
      mockGetEnglishDescription.mockReturnValue(undefined)

      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.queryByText('Description')).not.toBeInTheDocument()
    })

    it('should not display genus when not available', () => {
      mockGetEnglishGenus.mockReturnValue(undefined)

      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(screen.queryByText('Category')).not.toBeInTheDocument()
    })
  })

  describe('Hook Integration', () => {
    it('should call usePokemonSpecies with correct parameters', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(mockUsePokemonSpecies).toHaveBeenCalledWith(mockPokemonId)
    })
  })

  describe('Utility Functions Integration', () => {
    it('should call formatGenderRate with correct parameter', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(mockFormatGenderRate).toHaveBeenCalledWith(
        mockPokemonSpecies.gender_rate,
      )
    })

    it('should call formatName with correct parameters', () => {
      mockUsePokemonSpecies.mockReturnValue({
        species: mockPokemonSpecies,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
        isFetching: false,
      })

      render(<PokemonSpeciesInfo {...defaultProps} />)

      expect(mockFormatName).toHaveBeenCalledWith(
        mockPokemonSpecies.habitat?.name,
      )
      expect(mockFormatName).toHaveBeenCalledWith(
        mockPokemonSpecies.generation.name,
      )
      expect(mockFormatName).toHaveBeenCalledWith(
        mockPokemonSpecies.growth_rate.name,
      )
    })
  })
})
