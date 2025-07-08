'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/app/components/ui/button'
import {
  POKEMON_HISTORY_CONFIG,
  usePokemonHistoryStore,
} from '@/app/stores/pokemon-history'

export const PokemonHistory = () => {
  const { history, clearHistory } = usePokemonHistoryStore()

  if (history.length === 0) {
    return (
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
          <div className='mb-3 text-4xl'>📚</div>
          <h3 className='mb-2 text-lg font-semibold text-gray-800'>
            {POKEMON_HISTORY_CONFIG.TITLE}
          </h3>
          <p className='text-sm text-gray-600'>
            {POKEMON_HISTORY_CONFIG.EMPTY_MESSAGE}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-800'>
            {POKEMON_HISTORY_CONFIG.TITLE}
          </h3>
          <Button
            onClick={clearHistory}
            variant='secondary'
            size='sm'
            className='bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-500'
          >
            {POKEMON_HISTORY_CONFIG.CLEAR_BUTTON_TEXT}
          </Button>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {history.map((pokemon) => {
            return (
              <Link
                key={pokemon.name}
                href={`/pokemons/${pokemon.name}`}
                className='group block overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-md'
              >
                <div className='flex aspect-square items-center justify-center p-4'>
                  {pokemon.image ? (
                    <Image
                      width={80}
                      height={80}
                      loading='lazy'
                      src={pokemon.image}
                      alt={pokemon.name}
                      className='h-full w-full object-contain transition-transform duration-200 group-hover:scale-110'
                    />
                  ) : (
                    <div className='text-xs text-gray-400'>No Image</div>
                  )}
                </div>
                <div className='p-3 text-center'>
                  <p className='text-sm font-medium capitalize text-gray-800 group-hover:text-black'>
                    {pokemon.name}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
