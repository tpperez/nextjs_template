import { cache } from 'react'

import { notFound } from 'next/navigation'

import { Metadata } from 'next'

import { ViewPokemon } from '@/app/views/pokemon'

import { getPokemonDetailData } from './queries'
import type { IPagePokemonProps } from './type'

const getCachedPokemonData = cache(getPokemonDetailData)

export const generateMetadata = async ({
  params,
}: IPagePokemonProps): Promise<Metadata> => {
  const { pokemon } = await params
  const pokemonData = await getCachedPokemonData(pokemon)

  if (!pokemonData.success || !pokemonData.data) {
    return {
      title: 'Pokémon Not Found',
      description: 'We could not find the Pokémon you are looking for...',
      robots: 'noindex, nofollow',
    }
  }

  const pokemonDetails = pokemonData.data

  return {
    title: pokemonDetails?.name,
    description: `Check out all details of ${pokemonDetails?.name}`,
    openGraph: {
      title: pokemonDetails?.name,
      description: `Check out all details of ${pokemonDetails?.name}`,
      images: [
        {
          url: pokemonDetails?.sprites.front_default || '',
          alt: `${pokemonDetails?.name} image`,
        },
      ],
    },
  }
}

const PagePokemon = async ({ params }: IPagePokemonProps) => {
  const { pokemon } = await params
  const pokemonData = await getCachedPokemonData(pokemon)

  if (!pokemonData.success || !pokemonData.data) {
    notFound()
  }

  return <ViewPokemon data={pokemonData.data} />
}

export default PagePokemon
