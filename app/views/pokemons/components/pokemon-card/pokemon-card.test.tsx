import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePokemonHistoryStore } from '@/app/stores/pokemon-history'

import { PokemonCard } from './pokemon-card'

const mockAddToHistory = vi.fn()

vi.mock('@/app/stores/pokemon-history', () => {
  return {
    usePokemonHistoryStore: vi.fn(),
  }
})

vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      className,
      ...props
    }: React.ComponentProps<'img'>) => {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          {...props}
        />
      )
    },
  }
})

vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
      onClick,
      className,
      ...props
    }: React.ComponentProps<'a'>) => {
      return (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault()
            if (onClick) onClick(e)
          }}
          className={className}
          {...props}
        >
          {children}
        </a>
      )
    },
  }
})

describe('PokemonCard', () => {
  const mockPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  }

  const mockPokemonWithoutImage = {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/',
    image: '',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePokemonHistoryStore).mockReturnValue({
      addToHistory: mockAddToHistory,
      history: [],
      clearHistory: vi.fn(),
    })
  })

  describe('rendering', () => {
    it('renders pokemon name capitalized', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      expect(screen.getByText('pikachu')).toBeInTheDocument()
    })

    it('renders correct link href', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/pokemons/pikachu')
    })

    it('renders call to action text', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      expect(screen.getByText('Click to view details →')).toBeInTheDocument()
    })

    it('applies correct CSS classes to link', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'block',
        'overflow-hidden',
        'rounded-xl',
        'border',
        'border-gray-200',
        'bg-white',
        'shadow-lg',
        'transition-all',
        'duration-300',
        'hover:scale-105',
        'hover:shadow-xl',
      )
    })

    it('applies correct CSS classes to pokemon name', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const nameElement = screen.getByText('pikachu')
      expect(nameElement).toHaveClass(
        'mb-2',
        'text-xl',
        'font-bold',
        'capitalize',
        'text-black',
      )
    })
  })

  describe('image rendering', () => {
    it('renders pokemon image when image URL is provided', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', mockPokemon.image)
      expect(image).toHaveAttribute('alt', 'pikachu')
      expect(image).toHaveAttribute('width', '220')
      expect(image).toHaveAttribute('height', '220')
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('renders "No Image" text when image URL is empty', () => {
      render(<PokemonCard pokemon={mockPokemonWithoutImage} />)

      expect(screen.getByText('No Image')).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('renders "No Image" text when image URL is null', () => {
      const pokemonWithNullImage = {
        ...mockPokemon,
        image: null as unknown as string,
      }

      render(<PokemonCard pokemon={pokemonWithNullImage} />)

      expect(screen.getByText('No Image')).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('applies correct CSS classes to image container', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const imageContainer = screen.getByRole('img').parentElement
      expect(imageContainer).toHaveClass(
        'flex',
        'aspect-square',
        'items-center',
        'justify-center',
        'bg-gray-50',
      )
    })

    it('applies correct CSS classes to "No Image" text', () => {
      render(<PokemonCard pokemon={mockPokemonWithoutImage} />)

      const noImageText = screen.getByText('No Image')
      expect(noImageText).toHaveClass('text-sm', 'text-gray-400')
    })
  })

  describe('interactions', () => {
    it('calls addToHistory when pokemon card is clicked', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(mockAddToHistory).toHaveBeenCalledWith(mockPokemon)
      expect(mockAddToHistory).toHaveBeenCalledTimes(1)
    })

    it('calls addToHistory with correct pokemon data', () => {
      render(<PokemonCard pokemon={mockPokemonWithoutImage} />)

      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(mockAddToHistory).toHaveBeenCalledWith(mockPokemonWithoutImage)
    })
  })

  describe('store integration', () => {
    it('uses pokemon history store correctly', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      expect(vi.mocked(usePokemonHistoryStore)).toHaveBeenCalled()
    })

    it('handles store errors gracefully', () => {
      vi.mocked(usePokemonHistoryStore).mockImplementation(() => {
        throw new Error('Store error')
      })

      expect(() => {
        return render(<PokemonCard pokemon={mockPokemon} />)
      }).toThrow('Store error')
    })
  })

  describe('accessibility', () => {
    it('has proper alt text for pokemon image', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'pikachu')
    })

    it('has proper link role', () => {
      render(<PokemonCard pokemon={mockPokemon} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('handles pokemon name with special characters', () => {
      const pokemonWithSpecialName = {
        ...mockPokemon,
        name: 'mr-mime',
      }

      render(<PokemonCard pokemon={pokemonWithSpecialName} />)

      expect(screen.getByText('mr-mime')).toBeInTheDocument()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/pokemons/mr-mime')
    })

    it('handles very long pokemon names', () => {
      const pokemonWithLongName = {
        ...mockPokemon,
        name: 'verylongpokemonname',
      }

      render(<PokemonCard pokemon={pokemonWithLongName} />)

      expect(screen.getByText('verylongpokemonname')).toBeInTheDocument()
    })

    it('handles pokemon with undefined image gracefully', () => {
      const pokemonWithUndefinedImage = {
        ...mockPokemon,
        image: undefined as unknown as string,
      }

      render(<PokemonCard pokemon={pokemonWithUndefinedImage} />)

      expect(screen.getByText('No Image')).toBeInTheDocument()
    })
  })
})
