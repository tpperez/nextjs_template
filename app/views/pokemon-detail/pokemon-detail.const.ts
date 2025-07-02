export const POKEMON_DETAIL_CONFIG = {
  CACHE_DURATION: '1 hour',
  BADGE_TEXT: 'REST + Server-Side Rendered + Client-Side (GraphQL, REST)',
  SPECIES_CACHE_MINUTES: 30,
  SPECIES_GC_MINUTES: 60,
  POKEMON_MOVES_GRAPHQL_CACHE_MINUTES: 15,
  POKEMON_MOVES_GRAPHQL_GC_MINUTES: 30,
  RETRY_COUNT: 2,
}

export const ERROR_MESSAGES = {
  SPECIES_FAILED: 'Failed to load species information',
  POKEMON_MOVES_GRAPHQL_FAILED: 'Failed to load Pokemon moves via GraphQL',
  RETRY_TEXT: 'Try Again',
  UNKNOWN_ERROR: 'Unknown error occurred',
}

export const POKEMON_DETAIL_QUERY_KEY = 'pokemon-species'
export const POKEMON_MOVES_GRAPHQL_QUERY_KEY = 'pokemon-moves-graphql'

export const GET_POKEMON_MOVES_GRAPHQL = `
  query GetPokemonMoves($name: String!) {
    pokemon(name: $name) {
      id
      name
      moves {
        move {
          name
          url
        }
      }
      message
      status
    }
  }
`

export const MOVE_DISPLAY_CONFIG = {
  MAX_DISPLAY: 20,
}
