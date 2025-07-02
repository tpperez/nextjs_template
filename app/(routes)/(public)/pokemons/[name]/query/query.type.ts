export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}

export interface PokemonMove {
  move: {
    name: string
    url: string
  }
  version_group_details: Array<{
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }>
}

export interface PokemonDetail {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  order: number
  is_default: boolean
  abilities: PokemonAbility[]
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
  moves: PokemonMove[]
  species: {
    name: string
    url: string
  }
}
