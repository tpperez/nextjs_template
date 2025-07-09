import type { Metadata } from 'next'

import { ViewPokemons } from '@/app/views/pokemons'

import { getPokemonsData } from './queries'

export const metadata: Metadata = {
  title: 'All Pokémons',
  description: 'Check all Pokémons in our gallery',
}

const PagePokemons = async () => {
  const pokemonsData = await getPokemonsData(8, 0)

  return <ViewPokemons {...pokemonsData} />
}

export default PagePokemons
