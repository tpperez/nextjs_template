export const POKEMON_GALLERY_CONFIG = {
  TITLE: 'Pokémon Gallery',
  SUBTITLE: 'GraphQL API consumption demonstration',
  BADGE_TEXT: 'GraphQL + Server-Side Rendered',
  API_LINK: 'https://graphql-pokeapi.graphcdn.app/',
  CACHE_DURATION: '5 minutes',
  ERROR_TITLE: 'Failed to Load Pokémon Data',
  ERROR_MESSAGE: 'Please try again later.',
  NO_RESULTS_MESSAGE: 'No Pokémon found.',
}

export const POKEMONS_PER_PAGE = 8

export const POKEMONS_QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  QUERY_KEY: ['pokemons', 'infinite'],
}
