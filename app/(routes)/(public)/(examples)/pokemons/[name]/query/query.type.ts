export interface IPokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface IPokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface IPokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface IPokemonSprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}

export interface IPokemonMove {
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

export interface IPokemonDetail {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  order: number
  is_default: boolean
  abilities: IPokemonAbility[]
  types: IPokemonType[]
  stats: IPokemonStat[]
  sprites: IPokemonSprites
  moves: IPokemonMove[]
  species: {
    name: string
    url: string
  }
}
