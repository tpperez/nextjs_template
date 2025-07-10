import { useQuery } from '@tanstack/react-query'

import { restClient } from '@/app/services/http'

import {
  POKEMON_SPECIES_CONFIG,
  POKEMON_SPECIES_QUERY_KEY,
} from './pokemon-species.const'
import {
  IPokemonSpecies,
  TUsePokemonSpeciesOptions,
  TUsePokemonSpeciesReturn,
} from './pokemon-species-info.type'

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

const usePokemonSpecies = (
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
    queryKey: [POKEMON_SPECIES_QUERY_KEY, pokemonId],
    queryFn: () => {
      return fetchPokemonSpecies(pokemonId!)
    },
    enabled: enabled && !!pokemonId,
    staleTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_CACHE_MINUTES,
    gcTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_GC_MINUTES,
    retry: POKEMON_SPECIES_CONFIG.RETRY_COUNT,
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

export default usePokemonSpecies
