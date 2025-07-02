import type { Pokemon } from '@/app/(routes)/(public)/pokemons/query'

export interface IPokemonsViewProps {
  success: boolean
  data: Pokemon[]
  count: number
  next: string | null
  previous: string | null
  error?: string
}

export interface IPokemonCardProps {
  pokemon: Pokemon
}

export type { Pokemon }
