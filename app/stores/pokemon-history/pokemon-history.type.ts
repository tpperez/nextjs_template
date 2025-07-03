import type { Pokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

export interface IPokemonHistoryStore {
  history: Pokemon[]
  addToHistory: (pokemon: Pokemon) => void
  clearHistory: () => void
}

export type TPokemonHistoryItem = Pokemon
