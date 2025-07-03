import { graphqlClient } from '@/app/services/http'

import { GET_POKEMONS } from './query.const'
import { IPokemonsResponse } from './query.type'

export const getPokemonsData = async (
  limit: number = 8,
  offset: number = 0,
) => {
  try {
    const response = await graphqlClient.query<IPokemonsResponse>(
      GET_POKEMONS,
      {
        limit,
        offset,
      },
      {
        baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
        revalidate: 300,
      },
    )

    return {
      success: true,
      data: response.data?.pokemons?.results || [],
      count: response.data?.pokemons?.count || 0,
      next: response.data?.pokemons?.next || null,
      previous: response.data?.pokemons?.previous || null,
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return {
      success: false,
      data: [],
      count: 0,
      next: null,
      previous: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
