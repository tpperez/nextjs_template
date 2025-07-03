'use client'

import { useQuery } from '@tanstack/react-query'

import { graphqlClient, restClient } from '@/app/services/http'

import {
  GET_POKEMON_MOVES_GRAPHQL,
  POKEMON_DETAIL_CONFIG,
  POKEMON_DETAIL_QUERY_KEY,
  POKEMON_MOVES_GRAPHQL_QUERY_KEY,
} from './pokemon-detail.const'
import type {
  IGraphQLPokemonMovesResponse,
  IPokemonSpecies,
  TUsePokemonMovesGraphQLOptions,
  TUsePokemonMovesGraphQLReturn,
  TUsePokemonSpeciesOptions,
  TUsePokemonSpeciesReturn,
} from './pokemon-detail.type'

const fetchPokemonSpecies = async (
  pokemonId: number,
): Promise<IPokemonSpecies> => {
  return await restClient.get<IPokemonSpecies>(
    `/pokemon-species/${pokemonId}`,
    {
      baseUrl: 'https://pokeapi.co/api/v2',
    },
  )
}

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

export const usePokemonSpecies = (
  pokemonId: number | undefined,
  options: TUsePokemonSpeciesOptions = {},
): TUsePokemonSpeciesReturn => {
  const { enabled = true } = options

  const {
    data: species,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [POKEMON_DETAIL_QUERY_KEY, pokemonId],
    queryFn: () => {
      return fetchPokemonSpecies(pokemonId!)
    },
    enabled: enabled && !!pokemonId,
    staleTime: 1000 * 60 * POKEMON_DETAIL_CONFIG.SPECIES_CACHE_MINUTES,
    gcTime: 1000 * 60 * POKEMON_DETAIL_CONFIG.SPECIES_GC_MINUTES,
    retry: POKEMON_DETAIL_CONFIG.RETRY_COUNT,
  })

  return {
    species,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
    isFetching,
  }
}

export const usePokemonMovesGraphQL = (
  pokemonName: string,
  options?: TUsePokemonMovesGraphQLOptions,
): TUsePokemonMovesGraphQLReturn => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: [POKEMON_MOVES_GRAPHQL_QUERY_KEY, pokemonName],
    queryFn: () => {
      return fetchPokemonMovesGraphQL(pokemonName)
    },
    staleTime:
      POKEMON_DETAIL_CONFIG.POKEMON_MOVES_GRAPHQL_CACHE_MINUTES * 60 * 1000,
    gcTime: POKEMON_DETAIL_CONFIG.POKEMON_MOVES_GRAPHQL_GC_MINUTES * 60 * 1000,
    retry: POKEMON_DETAIL_CONFIG.RETRY_COUNT,
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
