'use client'

import { Button } from '@/app/components/ui/button'
import { Spinner } from '@/app/components/ui/spinner'

import { ERROR_MESSAGES } from '../../pokemon.const'
import { usePokemonSpecies } from '../../pokemon.hook'
import type { IPokemonSpeciesInfoProps } from '../../pokemon.type'
import {
  formatGenderRate,
  formatName,
  getEnglishDescription,
  getEnglishGenus,
} from '../../pokemon.util'

export const PokemonSpeciesInfo = ({ pokemonId }: IPokemonSpeciesInfoProps) => {
  const { species, isFetching, isError, error, refetch } =
    usePokemonSpecies(pokemonId)

  if (isFetching) {
    return (
      <div className='mb-6 rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Species Information</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            Client-side
          </div>
        </div>
        <Spinner text='Loading species information...' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='mb-6 rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Species Information</h2>
        </div>
        <div className='rounded-lg border border-gray-300 bg-gray-50 p-6 text-center text-gray-700'>
          <div className='mb-3 text-3xl'>⚠️</div>
          <p className='font-medium'>{ERROR_MESSAGES.SPECIES_FAILED}</p>
          <p className='mt-1 text-sm text-gray-600'>
            {error?.message || ERROR_MESSAGES.UNKNOWN_ERROR}
          </p>
          <Button
            onClick={() => {
              return refetch()
            }}
            variant='primary'
            size='sm'
            className='mt-3 bg-black hover:bg-gray-800'
          >
            {ERROR_MESSAGES.RETRY_TEXT}
          </Button>
        </div>
      </div>
    )
  }

  if (!species) {
    return null
  }

  const englishDescription = getEnglishDescription(species)
  const englishGenus = getEnglishGenus(species)

  return (
    <div className='mb-6 rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-xl font-bold text-black'>Species Information</h2>
        <div className='flex items-center space-x-2'>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ✅ REST Client-side
          </div>
        </div>
      </div>
      <div className='space-y-3'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {englishDescription && (
            <div className='rounded-lg border border-gray-300 bg-gray-50 p-4'>
              <h3 className='mb-2 text-sm font-semibold text-black'>
                Description
              </h3>
              <p className='text-sm italic leading-relaxed text-gray-700'>
                {englishDescription}
              </p>
            </div>
          )}

          {englishGenus && (
            <div className='rounded-lg border border-gray-300 bg-gray-50 p-4'>
              <h4 className='mb-1 text-sm font-semibold text-gray-700'>
                Category
              </h4>
              <p className='font-bold text-black'>{englishGenus}</p>
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <div className='rounded-lg border border-gray-300 bg-gray-50 p-4 text-center'>
            <div className='mb-1 text-xl'>🎯</div>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Capture Rate
            </h4>
            <p className='text-xl font-bold text-black'>
              {species.capture_rate}
            </p>
            <p className='text-xs text-gray-600'>Higher = Easier</p>
          </div>

          <div className='rounded-lg border border-gray-300 bg-gray-50 p-4 text-center'>
            <div className='mb-1 text-xl'>💚</div>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Base Happiness
            </h4>
            <p className='text-xl font-bold text-black'>
              {species.base_happiness}
            </p>
            <p className='text-xs text-gray-600'>Starting friendship</p>
          </div>

          <div className='rounded-lg border border-gray-300 bg-gray-50 p-4 text-center'>
            <div className='mb-1 text-xl'>⚥</div>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Gender Rate
            </h4>
            <p className='text-xl font-bold text-black'>
              {formatGenderRate(species.gender_rate)}
            </p>
            <p className='text-xs text-gray-600'>Female ratio</p>
          </div>

          <div className='rounded-lg border border-gray-300 bg-gray-50 p-4 text-center'>
            <div className='mb-1 text-xl'>🥚</div>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Hatch Counter
            </h4>
            <p className='text-xl font-bold text-black'>
              {species.hatch_counter}
            </p>
            <p className='text-xs text-gray-600'>Egg cycles</p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
          {species.habitat && (
            <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
              <h4 className='mb-1 text-xs font-semibold text-gray-700'>
                Habitat
              </h4>
              <p className='text-sm font-medium capitalize text-black'>
                {formatName(species.habitat.name)}
              </p>
            </div>
          )}

          <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Generation
            </h4>
            <p className='text-sm font-medium capitalize text-black'>
              {formatName(species.generation.name)}
            </p>
          </div>

          <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
            <h4 className='mb-1 text-xs font-semibold text-gray-700'>
              Growth Rate
            </h4>
            <p className='text-sm font-medium capitalize text-black'>
              {formatName(species.growth_rate.name)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
