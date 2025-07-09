import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ERROR_MESSAGES, MOVE_DISPLAY_CONFIG } from '../../pokemon.const'
import { usePokemonMovesGraphQL } from '../../pokemon.hook'
import type { IGraphQLPokemonMoves } from '../../pokemon.type'

import { PokemonMoves } from './pokemon-moves'

vi.mock('../../pokemon.hook', () => {
  return {
    usePokemonMovesGraphQL: vi.fn(),
  }
})

vi.mock('@/app/components/ui/spinner', () => {
  return {
    Spinner: ({ text }: { text: string }) => {
      return <div data-testid='spinner'>{text}</div>
    },
  }
})

const mockUsePokemonMovesGraphQL = vi.mocked(usePokemonMovesGraphQL)

describe('PokemonMoves Component', () => {
  const mockPokemonName = 'pikachu'
  const defaultProps = { pokemonName: mockPokemonName }

  const mockPokemonMoves: IGraphQLPokemonMoves = {
    id: 25,
    name: 'pikachu',
    status: true,
    message: 'Success',
    moves: [
      {
        move: {
          name: 'thunder-shock',
          url: 'https://example.com/thunder-shock',
        },
      },
      {
        move: { name: 'quick-attack', url: 'https://example.com/quick-attack' },
      },
      { move: { name: 'double-team', url: 'https://example.com/double-team' } },
      { move: { name: 'tail-whip', url: 'https://example.com/tail-whip' } },
    ],
  }

  const mockRefetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should render loading spinner when fetching data', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: undefined,
        isError: false,
        error: null,
        isFetching: true,
        isLoading: true,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Moves')).toBeInTheDocument()
      expect(screen.getByText('✨ GraphQL Client-side')).toBeInTheDocument()
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
      expect(
        screen.getByText('Loading moves via GraphQL...'),
      ).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should render error message when there is an error', () => {
      const errorMessage = 'Network error occurred'
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: undefined,
        isError: true,
        error: new Error(errorMessage),
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Moves')).toBeInTheDocument()
      expect(screen.getByText('❌ GraphQL Error')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should render default error message when error has no message', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: undefined,
        isError: true,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Moves')).toBeInTheDocument()
      expect(screen.getByText('❌ GraphQL Error')).toBeInTheDocument()
      expect(
        screen.getByText(ERROR_MESSAGES.POKEMON_MOVES_GRAPHQL_FAILED),
      ).toBeInTheDocument()
    })

    it('should render error message when pokemonMoves is undefined', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: undefined,
        isError: true,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(
        screen.getByText(ERROR_MESSAGES.POKEMON_MOVES_GRAPHQL_FAILED),
      ).toBeInTheDocument()
    })
  })

  describe('No Data State', () => {
    it('should render warning message when status is false', () => {
      const mockPokemonMovesNoStatus: IGraphQLPokemonMoves = {
        ...mockPokemonMoves,
        status: false,
        message: 'No moves available',
      }

      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMovesNoStatus,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Moves')).toBeInTheDocument()
      expect(screen.getByText('⚠️ GraphQL Warning')).toBeInTheDocument()
      expect(screen.getByText('No moves available')).toBeInTheDocument()
    })

    it('should render default message when status is false and no message provided', () => {
      const mockPokemonMovesNoStatus: IGraphQLPokemonMoves = {
        ...mockPokemonMoves,
        status: false,
        message: '',
      }

      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMovesNoStatus,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(
        screen.getByText('Pokemon moves data not available'),
      ).toBeInTheDocument()
    })
  })

  describe('Success State', () => {
    it('should render moves successfully', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMoves,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Moves')).toBeInTheDocument()
      expect(screen.getByText('✅ GraphQL Client-side')).toBeInTheDocument()

      // Check that formatted move names are displayed
      expect(screen.getByText('Thunder Shock')).toBeInTheDocument()
      expect(screen.getByText('Quick Attack')).toBeInTheDocument()
      expect(screen.getByText('Double Team')).toBeInTheDocument()
      expect(screen.getByText('Tail Whip')).toBeInTheDocument()
    })

    it('should limit displayed moves to MAX_DISPLAY config', () => {
      const manyMoves = Array.from({ length: 30 }, (_, i) => {
        return {
          move: { name: `move-${i}`, url: `https://example.com/move-${i}` },
        }
      })

      const mockPokemonMovesMany: IGraphQLPokemonMoves = {
        ...mockPokemonMoves,
        moves: manyMoves,
      }

      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMovesMany,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      // Should only display up to MAX_DISPLAY moves
      const displayedMoves = screen.getAllByText(/^Move \d+$/)
      expect(displayedMoves).toHaveLength(MOVE_DISPLAY_CONFIG.MAX_DISPLAY)
    })

    it('should apply hover effects to move cards', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMoves,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      const moveCard = screen.getByText('Thunder Shock')
      expect(moveCard).toHaveClass('hover:bg-gray-200')
    })
  })

  describe('Move Name Formatting', () => {
    it('should format move names correctly', () => {
      const mockMovesWithDashes: IGraphQLPokemonMoves = {
        ...mockPokemonMoves,
        moves: [
          {
            move: {
              name: 'thunder-shock',
              url: 'https://example.com/thunder-shock',
            },
          },
          {
            move: {
              name: 'double-kick',
              url: 'https://example.com/double-kick',
            },
          },
          {
            move: { name: 'mega-punch', url: 'https://example.com/mega-punch' },
          },
        ],
      }

      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockMovesWithDashes,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Thunder Shock')).toBeInTheDocument()
      expect(screen.getByText('Double Kick')).toBeInTheDocument()
      expect(screen.getByText('Mega Punch')).toBeInTheDocument()
    })

    it('should handle single word move names', () => {
      const mockSingleWordMoves: IGraphQLPokemonMoves = {
        ...mockPokemonMoves,
        moves: [
          { move: { name: 'tackle', url: 'https://example.com/tackle' } },
          { move: { name: 'scratch', url: 'https://example.com/scratch' } },
        ],
      }

      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockSingleWordMoves,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(screen.getByText('Tackle')).toBeInTheDocument()
      expect(screen.getByText('Scratch')).toBeInTheDocument()
    })
  })

  describe('Hook Integration', () => {
    it('should call usePokemonMovesGraphQL with correct parameters', () => {
      mockUsePokemonMovesGraphQL.mockReturnValue({
        pokemonMoves: mockPokemonMoves,
        isError: false,
        error: null,
        isFetching: false,
        isLoading: false,
        refetch: mockRefetch,
      })

      render(<PokemonMoves {...defaultProps} />)

      expect(mockUsePokemonMovesGraphQL).toHaveBeenCalledWith(mockPokemonName, {
        enabled: true,
      })
    })
  })
})
