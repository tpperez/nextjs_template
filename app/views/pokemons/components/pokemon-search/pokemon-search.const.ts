export const GET_POKEMON_BY_NAME = `
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      species {
        name
        url
      }
      types {
        type {
          name
        }
      }
    }
  }
`

export const POKEMON_SEARCH_QUERY_KEY = 'pokemon-search'
export const POKEMON_SEARCH_STALE_TIME = 5 * 60 * 1000
