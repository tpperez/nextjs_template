'use client'

import Image from 'next/image'
import Link from 'next/link'

import usePokemonHistoryStore from '@/app/stores/pokemon-history'

import type { IPokemonCardProps } from '../../pokemons.type'

const PokemonCard = ({ pokemon }: IPokemonCardProps) => {
  const { addToHistory } = usePokemonHistoryStore()

  const handlePokemonClick = () => {
    addToHistory(pokemon)
  }

  return (
    <Link
      key={pokemon.name}
      href={`/pokemons/${pokemon.name}`}
      onClick={handlePokemonClick}
      className='block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
    >
      <div className='flex aspect-square items-center justify-center bg-gray-50'>
        {pokemon.image ? (
          <Image
            width={220}
            height={220}
            loading='lazy'
            src={pokemon.image}
            alt={pokemon.name}
            className='h-full w-full object-contain p-6'
          />
        ) : (
          <div className='text-sm text-gray-400'>No Image</div>
        )}
      </div>
      <div className='p-6'>
        <h3 className='mb-2 text-xl font-bold capitalize text-black'>
          {pokemon.name}
        </h3>
        <p className='text-sm font-medium text-gray-600'>
          Click to view details →
        </p>
      </div>
    </Link>
  )
}

export default PokemonCard
