import type { Pokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

export interface IPokemonsViewProps {
  success: boolean
  data: Pokemon[]
  count: number
  previous: string | null
  error?: string
}

export interface IPokemonCardProps {
  pokemon: Pokemon
}

export interface UseMorePokemonsOptions {
  initialOffset?: number
}

export type { Pokemon }
