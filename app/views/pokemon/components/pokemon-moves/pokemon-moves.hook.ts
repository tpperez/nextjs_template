'use client'

import { useQuery } from '@tanstack/react-query'

import { graphqlClient } from '@/app/services/http/graphql'

import {
  GET_POKEMON_MOVES_GRAPHQL,
  POKEMON_MOVES_GRAPHQL_CONFIG,
  POKEMON_MOVES_GRAPHQL_QUERY_KEY,
} from './pokemon-moves.const'
import {
  IGraphQLPokemonMovesResponse,
  TUsePokemonMovesGraphQLOptions,
  TUsePokemonMovesGraphQLReturn,
} from './pokemon-moves.type'

const fetchPokemonMovesGraphQL = async (
  pokemonName: string,
): Promise<IGraphQLPokemonMovesResponse> => {
  const response = await graphqlClient.query(
    GET_POKEMON_MOVES_GRAPHQL,
    { name: pokemonName },
    {
      baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
    },
  )
  return response.data as IGraphQLPokemonMovesResponse
}

const usePokemonMovesGraphQL = (
  pokemonName: string,
  options?: TUsePokemonMovesGraphQLOptions,
): TUsePokemonMovesGraphQLReturn => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: [POKEMON_MOVES_GRAPHQL_QUERY_KEY, pokemonName],
    queryFn: () => {
      return fetchPokemonMovesGraphQL(pokemonName)
    },
    staleTime:
      POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_CACHE_MINUTES *
      60 *
      1000,
    gcTime:
      POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_GC_MINUTES * 60 * 1000,
    retry: POKEMON_MOVES_GRAPHQL_CONFIG.RETRY_COUNT,
    enabled: options?.enabled,
  })

  return {
    pokemonMoves: data?.pokemon,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
    isFetching,
  }
}

export default usePokemonMovesGraphQL
