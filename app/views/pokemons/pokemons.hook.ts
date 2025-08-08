import { useInfiniteQuery } from '@tanstack/react-query'

import { GET_POKEMONS } from '@/app/(routes)/(public)/(examples)/pokemons/queries/get-pokemons.const'
import type { IPokemonsResponse } from '@/app/(routes)/(public)/(examples)/pokemons/queries/get-pokemons.type'
import { graphqlClient } from '@/app/services/http/graphql'

import { POKEMONS_PER_PAGE, POKEMONS_QUERY_CONFIG } from './pokemons.const'
import type { TUseMorePokemonsOptions } from './pokemons.type'

export const useMorePokemons = ({
  initialOffset = 8,
}: TUseMorePokemonsOptions = {}) => {
  return useInfiniteQuery({
    queryKey: POKEMONS_QUERY_CONFIG.QUERY_KEY,
    queryFn: async ({ pageParam = initialOffset }) => {
      const response = await graphqlClient.query<IPokemonsResponse>(
        GET_POKEMONS,
        {
          limit: POKEMONS_PER_PAGE,
          offset: pageParam,
        },
        {
          baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
        },
      )

      return {
        data: response.data?.pokemons?.results || [],
        count: response.data?.pokemons?.count || 0,
        next: response.data?.pokemons?.next || null,
        previous: response.data?.pokemons?.previous || null,
        nextOffset: pageParam + POKEMONS_PER_PAGE,
      }
    },
    initialPageParam: initialOffset,
    getNextPageParam: (lastPage) => {
      const totalLoaded = lastPage.nextOffset
      const totalCount = lastPage.count

      return totalLoaded < totalCount ? lastPage.nextOffset : undefined
    },
    staleTime: POKEMONS_QUERY_CONFIG.STALE_TIME,
    enabled: false,
  })
}
