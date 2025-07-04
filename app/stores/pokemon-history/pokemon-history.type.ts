import type { IPokemon } from '@/app/(routes)/(public)/(examples)/pokemons/queries'

export interface IPokemonHistoryStore {
  history: IPokemon[]
  addToHistory: (pokemon: IPokemon) => void
  clearHistory: () => void
}

export type TPokemonHistoryItem = IPokemon
