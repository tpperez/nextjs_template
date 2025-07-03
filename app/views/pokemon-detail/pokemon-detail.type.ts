import type {
  PokemonAbility,
  PokemonDetail,
  PokemonMove,
  PokemonSprites,
  PokemonStat,
  PokemonType,
} from '@/app/(routes)/(public)/(examples)/pokemons/[name]/query'

export interface IPokemonDetailViewProps {
  data: PokemonDetail
}

export interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export interface Genus {
  genus: string
  language: {
    name: string
    url: string
  }
}

export interface PokemonSpecies {
  id: number
  name: string
  base_happiness: number
  capture_rate: number
  color: {
    name: string
    url: string
  }
  evolution_chain: {
    url: string
  }
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version: {
      name: string
      url: string
    }
  }>
  form_descriptions: Array<{
    description: string
    language: {
      name: string
      url: string
    }
  }>
  forms_switchable: boolean
  gender_rate: number
  generation: {
    name: string
    url: string
  }
  growth_rate: {
    name: string
    url: string
  }
  habitat: {
    name: string
    url: string
  } | null
  has_gender_differences: boolean
  hatch_counter: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  order: number
  pal_park_encounters: Array<{
    area: {
      name: string
      url: string
    }
    base_score: number
    rate: number
  }>
  pokedex_numbers: Array<{
    entry_number: number
    pokedex: {
      name: string
      url: string
    }
  }>
  shape: {
    name: string
    url: string
  } | null
  varieties: Array<{
    is_default: boolean
    pokemon: {
      name: string
      url: string
    }
  }>
}

export interface IPokemonSpeciesInfoProps {
  pokemonId: number
}

export interface IPokemonSpeciesResponse {
  species: PokemonSpecies
}

export type TUsePokemonSpeciesOptions = {
  enabled?: boolean
}

export type TUsePokemonSpeciesReturn = {
  species: PokemonSpecies | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  isFetching: boolean
}

export interface GraphQLMove {
  move: {
    name: string
    url: string
  }
}

export interface GraphQLPokemonMoves {
  id: number
  name: string
  moves: GraphQLMove[]
  message: string
  status: boolean
}

export interface GraphQLPokemonMovesResponse {
  pokemon: GraphQLPokemonMoves
}

export type TUsePokemonMovesGraphQLOptions = {
  enabled?: boolean
}

export type TUsePokemonMovesGraphQLReturn = {
  pokemonMoves: GraphQLPokemonMoves | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  isFetching: boolean
}

export interface IPokemonMovesGraphQLProps {
  pokemonName: string
}

export type {
  PokemonAbility,
  PokemonDetail,
  PokemonMove,
  PokemonSprites,
  PokemonStat,
  PokemonType,
}
