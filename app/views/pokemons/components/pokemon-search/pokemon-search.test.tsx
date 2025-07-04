import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PokemonSearch } from './pokemon-search'

describe('PokemonSearch', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders search input and search button', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    expect(
      screen.getByPlaceholderText('Search Pokémon by name...'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('shows clear button when input has value', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search Pokémon by name...')

    expect(
      screen.queryByRole('button', { name: 'Clear' }),
    ).not.toBeInTheDocument()

    fireEvent.input(input, { target: { value: 'bulbasaur' } })

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  it('clears input and calls onSearch with empty string when clear button is clicked', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search Pokémon by name...')

    fireEvent.input(input, { target: { value: 'squirtle' } })

    const clearButton = screen.getByRole('button', { name: 'Clear' })
    fireEvent.click(clearButton)

    expect(input).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('disables search button when input is empty', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    const submitButton = screen.getByRole('button', { name: 'Search' })

    expect(submitButton).toBeDisabled()
  })

  it('disables search button when input contains only whitespace', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search Pokémon by name...')
    const submitButton = screen.getByRole('button', { name: 'Search' })

    fireEvent.input(input, { target: { value: '   ' } })

    expect(submitButton).toBeDisabled()
  })

  it('enables search button when input has valid text', () => {
    render(<PokemonSearch onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search Pokémon by name...')
    const submitButton = screen.getByRole('button', { name: 'Search' })

    fireEvent.input(input, { target: { value: 'pokemon' } })

    expect(submitButton).toBeEnabled()
  })

  it('shows loading state when isLoading is true', () => {
    render(
      <PokemonSearch
        onSearch={mockOnSearch}
        isLoading={true}
      />,
    )

    const input = screen.getByPlaceholderText('Search Pokémon by name...')
    const submitButton = screen.getByRole('button', { name: 'Searching...' })

    expect(input).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  it('disables clear button when loading', () => {
    const { rerender } = render(<PokemonSearch onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search Pokémon by name...')
    fireEvent.input(input, { target: { value: 'test' } })

    rerender(
      <PokemonSearch
        onSearch={mockOnSearch}
        isLoading={true}
      />,
    )

    const clearButton = screen.getByRole('button', { name: 'Clear' })
    expect(clearButton).toBeDisabled()
  })

  it('prevents form submission when loading', () => {
    render(
      <PokemonSearch
        onSearch={mockOnSearch}
        isLoading={true}
      />,
    )

    const submitButton = screen.getByRole('button', { name: 'Searching...' })

    fireEvent.click(submitButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })
})
