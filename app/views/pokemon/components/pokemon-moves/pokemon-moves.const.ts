export const POKEMON_MOVES_GRAPHQL_CONFIG = {
  POKEMON_MOVES_GRAPHQL_CACHE_MINUTES: 15,
  POKEMON_MOVES_GRAPHQL_GC_MINUTES: 30,
  RETRY_COUNT: 2,
}

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
