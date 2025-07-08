'use client'

import { useState } from 'react'

import { Button } from '@/app/components/ui/button'
import { Spinner } from '@/app/components/ui/spinner'

import { PokemonCard } from './components/pokemon-card'
import {
  PokemonSearch,
  usePokemonNameSearch,
} from './components/pokemon-search'
import { POKEMON_GALLERY_CONFIG } from './pokemons.const'
import { useMorePokemons } from './pokemons.hook'
import type { IPokemonsViewProps } from './pokemons.type'

export const ViewPokemons = ({
  success,
  data,
  error: viewError,
  count,
}: IPokemonsViewProps) => {
  const {
    TITLE,
    SUBTITLE,
    BADGE_TEXT,
    API_LINK,
    CACHE_DURATION,
    ERROR_TITLE,
    ERROR_MESSAGE,
    NO_RESULTS_MESSAGE,
  } = POKEMON_GALLERY_CONFIG

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMorePokemons()

  const allPokemons = [
    ...data,
    ...(infiniteData?.pages.flatMap((page) => {
      return page.data
    }) || []),
  ]

  const [searchValue, setSearchValue] = useState('')

  const {
    result: searchResult,
    isLoading: isSearching,
    error: searchError,
  } = usePokemonNameSearch(searchValue)

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const hasSearch = !!searchValue.trim()

  const getDisplayPokemons = () => {
    if (!hasSearch) return allPokemons
    if (!searchResult) return []

    return [
      {
        name: searchResult.name,
        image: searchResult.sprites?.front_default || '',
        url: `/pokemons/${searchResult.name}`,
      },
    ]
  }

  const displayPokemons = getDisplayPokemons()
  const isLoading = hasSearch && isSearching
  const filterError = hasSearch ? searchError : null

  const showSearchResults = hasSearch
  const showAllPokemons = !hasSearch
  const hasSearchError = filterError && !isLoading
  const hasNoResults = displayPokemons.length === 0 && !isLoading

  const shouldShowLoadMoreButton =
    !hasSearch && (hasNextPage || (data.length >= 8 && data.length < count))

  if (!success) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 text-center'>
              <h1 className='mb-4 text-5xl font-bold text-black'>{TITLE}</h1>
              <p className='mb-2 text-xl text-gray-600'>{SUBTITLE}</p>
              <div className='inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800'>
                <span className='mr-2 h-2 w-2 rounded-full bg-gray-600'></span>
                {BADGE_TEXT}
              </div>
            </div>

            <div className='mx-auto max-w-md'>
              <div className='rounded-xl border border-gray-300 bg-white p-8 text-center shadow-lg'>
                <div className='mb-4 text-6xl'>⚠️</div>
                <h3 className='mb-3 text-2xl font-bold text-black'>
                  {ERROR_TITLE}
                </h3>
                <p className='text-gray-600'>{ERROR_MESSAGE}</p>
                {viewError && (
                  <p className='mt-2 text-sm text-gray-500'>{viewError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h1 className='mb-4 text-5xl font-bold text-black'>{TITLE}</h1>
            <p className='mb-2 text-xl text-gray-600'>{SUBTITLE}</p>
            <div className='mb-2 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800'>
              <span className='mr-2 h-2 w-2 rounded-full bg-gray-600'></span>
              {BADGE_TEXT}
            </div>
            <p className='text-gray-500'>
              Using{' '}
              <a
                href={API_LINK}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-black underline hover:text-gray-700'
              >
                GraphQL PokeAPI
              </a>
            </p>
          </div>

          <PokemonSearch
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {showSearchResults && (
            <div className='mb-8'>
              {isLoading && <Spinner text='Searching...' />}
              {hasSearchError && (
                <div className='text-center text-red-500'>
                  {filterError?.message || 'No Pokémon found.'}
                </div>
              )}
              {displayPokemons.length > 0 && (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {displayPokemons.map((pokemon) => {
                    return (
                      <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {showAllPokemons && (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {allPokemons.map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    pokemon={pokemon}
                  />
                )
              })}
            </div>
          )}

          {hasNoResults && (
            <div className='mt-12 text-center text-gray-500'>
              <div className='mb-4 text-6xl'>🔍</div>
              <p className='text-xl'>{NO_RESULTS_MESSAGE}</p>
            </div>
          )}

          {shouldShowLoadMoreButton && (
            <div className='mt-8 text-center'>
              <Button
                onClick={() => {
                  fetchNextPage()
                }}
                isLoading={isFetchingNextPage}
                loadingText='Loading more...'
                variant='primary'
                leftIcon={!isFetchingNextPage ? '🔽' : undefined}
              >
                {' '}
                Show more pokemons
              </Button>
            </div>
          )}

          <div className='mt-12 text-center'>
            <div className='inline-flex items-center space-x-4 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm text-gray-600 shadow-sm'>
              <div className='flex items-center space-x-2'>
                <span>🔄</span>
                <span>Cache: {CACHE_DURATION}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>⚡</span>
                <span>Server-side rendered</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>📱</span>
                <span>Client-side pagination</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
