import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Pokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

import { POKEMON_HISTORY_CONFIG } from './pokemon-history.const'

export interface IPokemonHistoryStore {
  history: Pokemon[]
  addToHistory: (pokemon: Pokemon) => void
  clearHistory: () => void
}

export const usePokemonHistoryStore = create<IPokemonHistoryStore>()(
  persist(
    (set) => {
      return {
        history: [],
        addToHistory: (pokemon: Pokemon) => {
          return set((state) => {
            const existingIndex = state.history.findIndex((item) => {
              return item.name === pokemon.name
            })

            if (existingIndex !== -1) {
              const newHistory = [
                pokemon,
                ...state.history.filter((_, index) => {
                  return index !== existingIndex
                }),
              ]
              return {
                history: newHistory.slice(
                  0,
                  POKEMON_HISTORY_CONFIG.MAX_HISTORY_SIZE,
                ),
              }
            }

            const newHistory = [pokemon, ...state.history]
            return {
              history: newHistory.slice(
                0,
                POKEMON_HISTORY_CONFIG.MAX_HISTORY_SIZE,
              ),
            }
          })
        },
        clearHistory: () => {
          return set({ history: [] })
        },
      }
    },
    {
      name: POKEMON_HISTORY_CONFIG.STORAGE_KEY,
      partialize: (state) => {
        return { history: state.history }
      },
    },
  ),
)
