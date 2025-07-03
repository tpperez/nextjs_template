import type { IPokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

export interface IPokemonsViewProps {
  success: boolean
  data: IPokemon[]
  count: number
  previous: string | null
  error?: string
}

export interface IPokemonCardProps {
  pokemon: IPokemon
}

export type TUseMorePokemonsOptions = {
  initialOffset?: number
}

export type { IPokemon }
