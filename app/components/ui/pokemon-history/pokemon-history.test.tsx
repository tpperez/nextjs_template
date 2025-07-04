'use client'

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { IPokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

vi.mock('@/app/stores/pokemon-history', () => {
  return {
    usePokemonHistoryStore: vi.fn(),
    POKEMON_HISTORY_CONFIG: {
      MAX_HISTORY_SIZE: 5,
      TITLE: 'Recently Viewed',
      EMPTY_MESSAGE: 'No pokemons viewed yet',
      CLEAR_BUTTON_TEXT: 'Clear History',
      STORAGE_KEY: 'pokemon-history',
    },
  }
})

vi.mock('next/image', () => {
  return {
    default: ({
      src,
      alt,
      width,
      height,
      className,
      ...props
    }: {
      src: string
      alt: string
      width: number | string
      height: number | string
      className?: string
      [key: string]: unknown
    }) => {
      return (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          {...props}
        />
      )
    },
  }
})

vi.mock('next/link', () => {
  return {
    default: ({
      href,
      children,
      className,
      ...props
    }: {
      href: string
      children: React.ReactNode
      className?: string
      [key: string]: unknown
    }) => {
      return (
        <a
          href={href}
          className={className}
          {...props}
        >
          {children}
        </a>
      )
    },
  }
})

import {
  POKEMON_HISTORY_CONFIG,
  usePokemonHistoryStore,
} from '@/app/stores/pokemon-history'

import { PokemonHistory } from './pokemon-history'

const mockUsePokemonHistoryStore =
  usePokemonHistoryStore as unknown as ReturnType<typeof vi.fn>

describe('PokemonHistory Component', () => {
  const mockClearHistory = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Empty State', () => {
    beforeEach(() => {
      mockUsePokemonHistoryStore.mockReturnValue({
        history: [],
        clearHistory: mockClearHistory,
      })
    })

    it('should render empty state when history is empty', () => {
      render(<PokemonHistory />)

      expect(screen.getByText(POKEMON_HISTORY_CONFIG.TITLE)).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_HISTORY_CONFIG.EMPTY_MESSAGE),
      ).toBeInTheDocument()
      expect(screen.getByText('📚')).toBeInTheDocument()
    })

    it('should not render clear button when history is empty', () => {
      render(<PokemonHistory />)

      expect(
        screen.queryByText(POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT),
      ).not.toBeInTheDocument()
    })

    it('should apply correct styling for empty state', () => {
      render(<PokemonHistory />)

      const container = screen
        .getByText(POKEMON_HISTORY_CONFIG.EMPTY_MESSAGE)
        .closest('div')
      expect(container).toHaveClass('text-center')
    })
  })

  describe('Populated State', () => {
    const mockPokemonHistory: IPokemon[] = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      },
      {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/6/',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
      },
      {
        name: 'blastoise',
        url: 'https://pokeapi.co/api/v2/pokemon/9/',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
      },
    ]

    beforeEach(() => {
      mockUsePokemonHistoryStore.mockReturnValue({
        history: mockPokemonHistory,
        clearHistory: mockClearHistory,
      })
    })

    it('should render pokemon cards when history has items', () => {
      render(<PokemonHistory />)

      expect(screen.getByText('pikachu')).toBeInTheDocument()
      expect(screen.getByText('charizard')).toBeInTheDocument()
      expect(screen.getByText('blastoise')).toBeInTheDocument()
    })

    it('should render pokemon images correctly', () => {
      render(<PokemonHistory />)

      const pikachuImage = screen.getByAltText('pikachu')
      expect(pikachuImage).toBeInTheDocument()
      expect(pikachuImage).toHaveAttribute('src', mockPokemonHistory[0].image)
      expect(pikachuImage).toHaveAttribute('width', '80')
      expect(pikachuImage).toHaveAttribute('height', '80')
    })

    it('should render correct navigation links', () => {
      render(<PokemonHistory />)

      const pikachuLink = screen.getByText('pikachu').closest('a')
      expect(pikachuLink).toHaveAttribute('href', '/pokemons/pikachu')

      const charizardLink = screen.getByText('charizard').closest('a')
      expect(charizardLink).toHaveAttribute('href', '/pokemons/charizard')
    })

    it('should render clear button when history has items', () => {
      render(<PokemonHistory />)

      expect(
        screen.getByText(POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT),
      ).toBeInTheDocument()
    })

    it('should call clearHistory when clear button is clicked', () => {
      render(<PokemonHistory />)

      const clearButton = screen.getByText(
        POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT,
      )
      fireEvent.click(clearButton)

      expect(mockClearHistory).toHaveBeenCalledTimes(1)
    })

    it('should render title correctly', () => {
      render(<PokemonHistory />)

      expect(screen.getByText(POKEMON_HISTORY_CONFIG.TITLE)).toBeInTheDocument()
    })

    it('should capitalize pokemon names', () => {
      render(<PokemonHistory />)

      const pikachuName = screen.getByText('pikachu')
      expect(pikachuName).toHaveClass('capitalize')
    })
  })

  describe('Pokemon without Image', () => {
    const mockPokemonWithoutImage: IPokemon[] = [
      {
        name: 'missingno',
        url: 'https://pokeapi.co/api/v2/pokemon/999/',
        image: '',
      },
    ]

    beforeEach(() => {
      mockUsePokemonHistoryStore.mockReturnValue({
        history: mockPokemonWithoutImage,
        clearHistory: mockClearHistory,
      })
    })

    it('should render fallback text when pokemon has no image', () => {
      render(<PokemonHistory />)

      expect(screen.getByText('No Image')).toBeInTheDocument()
      expect(screen.queryByAltText('missingno')).not.toBeInTheDocument()
    })

    it('should still render pokemon name and link when image is missing', () => {
      render(<PokemonHistory />)

      expect(screen.getByText('missingno')).toBeInTheDocument()
      const link = screen.getByText('missingno').closest('a')
      expect(link).toHaveAttribute('href', '/pokemons/missingno')
    })
  })

  describe('Accessibility', () => {
    const mockPokemonHistory: IPokemon[] = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      },
    ]

    beforeEach(() => {
      mockUsePokemonHistoryStore.mockReturnValue({
        history: mockPokemonHistory,
        clearHistory: mockClearHistory,
      })
    })

    it('should have proper alt text for images', () => {
      render(<PokemonHistory />)

      const image = screen.getByAltText('pikachu')
      expect(image).toBeInTheDocument()
    })

    it('should have proper button attributes for clear button', () => {
      render(<PokemonHistory />)

      const clearButton = screen.getByText(
        POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT,
      )
      expect(clearButton.tagName).toBe('BUTTON')
      expect(clearButton).toHaveClass('focus:outline-none', 'focus:ring-2')
    })

    it('should have proper link structure', () => {
      render(<PokemonHistory />)

      const link = screen.getByText('pikachu').closest('a')
      expect(link).toHaveAttribute('href', '/pokemons/pikachu')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined image gracefully', () => {
      const mockPokemonWithUndefinedImage: IPokemon[] = [
        {
          name: 'test-pokemon',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          image: undefined as unknown as string,
        },
      ]

      mockUsePokemonHistoryStore.mockReturnValue({
        history: mockPokemonWithUndefinedImage,
        clearHistory: mockClearHistory,
      })

      render(<PokemonHistory />)

      expect(screen.getByText('No Image')).toBeInTheDocument()
      expect(screen.getByText('test-pokemon')).toBeInTheDocument()
    })

    it('should handle single pokemon in history', () => {
      const singlePokemon: IPokemon[] = [
        {
          name: 'solo-pokemon',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          image: 'https://example.com/pokemon.png',
        },
      ]

      mockUsePokemonHistoryStore.mockReturnValue({
        history: singlePokemon,
        clearHistory: mockClearHistory,
      })

      render(<PokemonHistory />)

      expect(screen.getByText('solo-pokemon')).toBeInTheDocument()
      expect(
        screen.getByText(POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT),
      ).toBeInTheDocument()
    })
  })
})
