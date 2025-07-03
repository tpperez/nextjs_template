import Image from 'next/image'
import Link from 'next/link'

import { PokemonMoves } from './components/pokemon-moves'
import { PokemonSpeciesInfo } from './components/pokemon-species-info'
import { POKEMON_DETAIL_CONFIG } from './pokemon-detail.const'
import type { IPokemonDetailViewProps } from './pokemon-detail.type'
import { formatName, formatStatName } from './pokemon-detail.util'

export const ViewPokemonDetail = ({
  data: pokemon,
}: IPokemonDetailViewProps) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-6'>
            <Link
              href='/pokemons'
              className='mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md'
            >
              Back to Pokémon List
            </Link>
          </div>
          <div className='mb-6 text-center'>
            <h1 className='mb-1 text-3xl font-bold capitalize text-black'>
              {pokemon.name}
            </h1>
            <p className='mb-2 text-lg text-gray-600'>
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
            <div className='inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800'>
              <span className='mr-2 h-1.5 w-1.5 rounded-full bg-gray-600'></span>
              {POKEMON_DETAIL_CONFIG.BADGE_TEXT}
            </div>
          </div>

          <div className='mb-5 rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
            <div className='mb-3 flex items-center justify-between'>
              <h2 className='text-xl font-bold text-black'>
                Basic Information
              </h2>
              <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
                ✅ REST Server-Side Rendered
              </div>
            </div>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
              <div className='lg:col-span-1'>
                <div className='mb-3 flex aspect-square items-center justify-center rounded-lg border border-gray-300 bg-gray-50'>
                  {pokemon.sprites.front_default ? (
                    <Image
                      width={220}
                      height={220}
                      loading='lazy'
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className='h-full w-full object-contain p-4'
                    />
                  ) : (
                    <div className='text-gray-400'>No Image Available</div>
                  )}
                </div>
              </div>

              <div className='lg:col-span-3'>
                <div className='mb-4 grid grid-cols-3 gap-4'>
                  <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
                    <p className='mb-1 block text-xs font-medium text-gray-700'>
                      Height
                    </p>
                    <p className='text-lg font-bold text-black'>
                      {pokemon.height / 10} m
                    </p>
                  </div>

                  <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
                    <p className='mb-1 block text-xs font-medium text-gray-700'>
                      Weight
                    </p>
                    <p className='text-lg font-bold text-black'>
                      {pokemon.weight / 10} kg
                    </p>
                  </div>

                  <div className='rounded-lg border border-gray-300 bg-gray-50 p-3'>
                    <p className='mb-1 block text-xs font-medium text-gray-700'>
                      Base Exp.
                    </p>
                    <p className='text-lg font-bold text-black'>
                      {pokemon.base_experience}
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='mb-2 block text-sm font-medium text-gray-700'>
                      Types
                    </p>
                    <div className='flex gap-2'>
                      {pokemon.types.map((type) => {
                        return (
                          <span
                            key={type.type.name}
                            className='rounded-lg border border-gray-400 bg-gray-100 px-3 py-1 font-medium capitalize text-gray-800'
                          >
                            {type.type.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <p className='mb-2 block text-sm font-medium text-gray-700'>
                      Abilities
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {pokemon.abilities.map((ability) => {
                        return (
                          <div
                            key={ability.ability.name}
                            className='flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1'
                          >
                            <span className='text-sm font-medium capitalize text-gray-800'>
                              {formatName(ability.ability.name)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PokemonSpeciesInfo pokemonId={pokemon.id} />

          <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
            <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-xl font-bold text-black'>Base Stats</h2>
                <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
                  ✅ REST Server-Side Rendered
                </div>
              </div>
              <div className='space-y-3'>
                {pokemon.stats.map((stat) => {
                  return (
                    <div key={stat.stat.name}>
                      <div className='mb-1 flex items-center justify-between'>
                        <span className='text-sm font-medium text-gray-700'>
                          {formatStatName(stat.stat.name)}
                        </span>
                        <span className='rounded border border-gray-400 bg-gray-100 px-2 py-1 text-sm font-bold text-black'>
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className='h-1.5 w-full rounded-full border border-gray-300 bg-gray-200'>
                        <div
                          className='h-1.5 rounded-full bg-gradient-to-r from-gray-600 to-black transition-all duration-500'
                          style={{
                            width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <PokemonMoves pokemonName={pokemon.name} />
          </div>

          <div className='mt-6 text-center'>
            <div className='inline-flex items-center space-x-4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm'>
              <div className='flex items-center space-x-2'>
                <span>🔄</span>
                <span>Cache: {POKEMON_DETAIL_CONFIG.CACHE_DURATION}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>⚡</span>
                <span>Server-side rendered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
