import { useQuery } from '@tanstack/react-query'

import { graphqlClient } from '@/app/services/http/graphql'

import {
  GET_POKEMON_BY_NAME,
  POKEMON_SEARCH_QUERY_KEY,
  POKEMON_SEARCH_STALE_TIME,
} from './pokemon-search.const'
import type {
  IPokemonSearchResponse,
  IPokemonSearchResult,
} from './pokemon-search.type'

const searchPokemonByName = async (
  name: string,
): Promise<IPokemonSearchResult> => {
  const response = await graphqlClient.query<IPokemonSearchResponse>(
    GET_POKEMON_BY_NAME,
    { name: name.toLowerCase() },
    {
      baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
    },
  )

  const pokemon = response.data?.pokemon

  if (!pokemon || !pokemon.name || pokemon.id === null) {
    throw new Error(`Pokemon "${name}" not found`)
  }

  return pokemon
}

export const usePokemonNameSearch = (searchTerm: string) => {
  const {
    data: result,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [POKEMON_SEARCH_QUERY_KEY, searchTerm],
    queryFn: () => {
      return searchPokemonByName(searchTerm)
    },
    enabled: !!searchTerm.trim(),
    staleTime: POKEMON_SEARCH_STALE_TIME,
    retry: 1,
  })

  return {
    result,
    isLoading,
    error: error as Error | null,
    refetch,
  }
}
