import { ViewPokemons } from '@/app/views/pokemons'

import { getPokemonsData } from './query'

const PagePokemons = async () => {
  const pokemonsData = await getPokemonsData(8, 0)

  return <ViewPokemons {...pokemonsData} />
}

export default PagePokemons
