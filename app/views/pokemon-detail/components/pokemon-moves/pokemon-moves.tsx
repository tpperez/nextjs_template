'use client'

import { Spinner } from '@/app/components/ui/spinner'

import { ERROR_MESSAGES, MOVE_DISPLAY_CONFIG } from '../../pokemon-detail.const'
import { usePokemonMovesGraphQL } from '../../pokemon-detail.hook'
import type { IPokemonMovesGraphQLProps } from '../../pokemon-detail.type'

export const PokemonMoves = ({ pokemonName }: IPokemonMovesGraphQLProps) => {
  const { pokemonMoves, isError, error, isFetching } = usePokemonMovesGraphQL(
    pokemonName,
    { enabled: true },
  )

  if (isFetching) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Moves</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ✨ GraphQL Client-side
          </div>
        </div>
        <Spinner text='Loading moves via GraphQL...' />
      </div>
    )
  }

  if (isError || !pokemonMoves) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Moves</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ❌ GraphQL Error
          </div>
        </div>
        <div className='rounded-lg border border-gray-300 bg-gray-50 p-6 text-center'>
          <p className='text-gray-600'>
            {error?.message || ERROR_MESSAGES.POKEMON_MOVES_GRAPHQL_FAILED}
          </p>
        </div>
      </div>
    )
  }

  if (!pokemonMoves.status) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Moves</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ⚠️ GraphQL Warning
          </div>
        </div>
        <div className='rounded-lg border border-gray-300 bg-gray-50 p-6 text-center'>
          <p className='text-gray-600'>
            {pokemonMoves.message || 'Pokemon moves data not available'}
          </p>
        </div>
      </div>
    )
  }

  const formatMoveName = (moveName: string): string => {
    return moveName
      .split('-')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ')
  }

  return (
    <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold text-black'>Moves</h2>
        <div className='flex items-center space-x-2'>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ✅ GraphQL Client-side
          </div>
        </div>
      </div>

      <div className='grid max-h-80 grid-cols-2 gap-1 overflow-y-auto'>
        {pokemonMoves.moves
          .slice(0, MOVE_DISPLAY_CONFIG.MAX_DISPLAY)
          .map((moveInfo, index) => {
            return (
              <div
                key={`${moveInfo.move.name}-${index}`}
                className='rounded border border-gray-400 bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-800 transition-colors duration-200 hover:bg-gray-200'
              >
                {formatMoveName(moveInfo.move.name)}
              </div>
            )
          })}
      </div>
    </div>
  )
}
