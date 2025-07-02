import { ViewPokemons } from '@/app/views/pokemons'
import { getPokemonsData } from './query'

const PokemonsPage = async () => {
  const pokemonsData = await getPokemonsData()

  return <ViewPokemons {...pokemonsData} />
}

export default PokemonsPage
