import { restClient } from '@/app/services/http'

import { PokemonDetail } from './query.type'

export const getPokemonDetailData = async (name: string) => {
  try {
    const response = await restClient.get<PokemonDetail>(
      `/pokemon/${name.toLowerCase()}`,
      {
        baseUrl: 'https://pokeapi.co/api/v2',
        revalidate: 3600,
      },
    )

    return {
      success: true,
      data: response,
      error: null,
    }
  } catch (error) {
    console.error(`Error fetching Pokémon ${name}:`, error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
