import { describe, expect, it } from 'vitest'

import type { IPokemonSpecies } from './pokemon-detail.type'
import {
  formatGenderRate,
  formatName,
  formatStatName,
  getEnglishDescription,
  getEnglishGenus,
} from './pokemon-detail.util'

describe('pokemon-detail.util', () => {
  describe('formatStatName', () => {
    it('should replace hyphens with spaces and capitalize first letter of each word', () => {
      const result = formatStatName('special-attack')
      expect(result).toBe('Special Attack')
    })

    it('should handle single word stats', () => {
      const result = formatStatName('speed')
      expect(result).toBe('Speed')
    })

    it('should handle already capitalized words', () => {
      const result = formatStatName('HP')
      expect(result).toBe('HP')
    })

    it('should handle empty string', () => {
      const result = formatStatName('')
      expect(result).toBe('')
    })
  })

  describe('getEnglishDescription', () => {
    it('should return English description and clean up formatting', () => {
      const mockSpecies: IPokemonSpecies = {
        flavor_text_entries: [
          {
            flavor_text: 'A cute\fPokémon\nwith electric powers.',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
            version: {
              name: 'red',
              url: 'https://pokeapi.co/api/v2/version/1/',
            },
          },
          {
            flavor_text: 'Un Pokémon mignon avec des pouvoirs électriques.',
            language: {
              name: 'fr',
              url: 'https://pokeapi.co/api/v2/language/5/',
            },
            version: {
              name: 'red',
              url: 'https://pokeapi.co/api/v2/version/1/',
            },
          },
        ],
      } as IPokemonSpecies

      const result = getEnglishDescription(mockSpecies)
      expect(result).toBe('A cute Pokémon with electric powers.')
    })

    it('should return undefined when no English description is found', () => {
      const mockSpecies: IPokemonSpecies = {
        flavor_text_entries: [
          {
            flavor_text: 'Un Pokémon mignon avec des pouvoirs électriques.',
            language: {
              name: 'fr',
              url: 'https://pokeapi.co/api/v2/language/5/',
            },
            version: {
              name: 'red',
              url: 'https://pokeapi.co/api/v2/version/1/',
            },
          },
        ],
      } as IPokemonSpecies

      const result = getEnglishDescription(mockSpecies)
      expect(result).toBeUndefined()
    })

    it('should handle empty flavor text entries', () => {
      const mockSpecies = {
        flavor_text_entries: [],
      } as unknown as IPokemonSpecies

      const result = getEnglishDescription(mockSpecies)
      expect(result).toBeUndefined()
    })

    it('should handle multiple line breaks and form feeds', () => {
      const mockSpecies: IPokemonSpecies = {
        flavor_text_entries: [
          {
            flavor_text: 'First line\f\nSecond line\f\f\nThird line',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
            version: {
              name: 'red',
              url: 'https://pokeapi.co/api/v2/version/1/',
            },
          },
        ],
      } as IPokemonSpecies

      const result = getEnglishDescription(mockSpecies)
      expect(result).toBe('First line  Second line   Third line')
    })
  })

  describe('getEnglishGenus', () => {
    it('should return English genus when available', () => {
      const mockSpecies = {
        genera: [
          {
            genus: 'Mouse Pokémon',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
          },
          {
            genus: 'Pokémon Souris',
            language: {
              name: 'fr',
              url: 'https://pokeapi.co/api/v2/language/5/',
            },
          },
        ],
      } as Partial<IPokemonSpecies>

      const result = getEnglishGenus(mockSpecies as IPokemonSpecies)
      expect(result).toBe('Mouse Pokémon')
    })

    it('should return undefined when no English genus is found', () => {
      const mockSpecies = {
        genera: [
          {
            genus: 'Pokémon Souris',
            language: {
              name: 'fr',
              url: 'https://pokeapi.co/api/v2/language/5/',
            },
          },
        ],
      } as Partial<IPokemonSpecies>

      const result = getEnglishGenus(mockSpecies as IPokemonSpecies)
      expect(result).toBeUndefined()
    })

    it('should return undefined when genera is not present', () => {
      const mockSpecies = {} as Partial<IPokemonSpecies>

      const result = getEnglishGenus(mockSpecies as IPokemonSpecies)
      expect(result).toBeUndefined()
    })

    it('should return undefined when genera is empty', () => {
      const mockSpecies = {
        genera: [],
      } as Partial<IPokemonSpecies>

      const result = getEnglishGenus(mockSpecies as IPokemonSpecies)
      expect(result).toBeUndefined()
    })
  })

  describe('formatGenderRate', () => {
    it('should return "None" for genderless Pokémon (rate -1)', () => {
      const result = formatGenderRate(-1)
      expect(result).toBe('None')
    })

    it('should format gender rate as female percentage', () => {
      const result = formatGenderRate(1)
      expect(result).toBe('12.5% ♀')
    })

    it('should handle 0 gender rate (0% female)', () => {
      const result = formatGenderRate(0)
      expect(result).toBe('0% ♀')
    })

    it('should handle maximum gender rate (100% female)', () => {
      const result = formatGenderRate(8)
      expect(result).toBe('100% ♀')
    })

    it('should handle 50% gender rate', () => {
      const result = formatGenderRate(4)
      expect(result).toBe('50% ♀')
    })

    it('should handle 25% gender rate', () => {
      const result = formatGenderRate(2)
      expect(result).toBe('25% ♀')
    })

    it('should handle 87.5% gender rate', () => {
      const result = formatGenderRate(7)
      expect(result).toBe('87.5% ♀')
    })
  })

  describe('formatName', () => {
    it('should replace hyphens with spaces', () => {
      const result = formatName('ho-oh')
      expect(result).toBe('ho oh')
    })

    it('should handle names without hyphens', () => {
      const result = formatName('pikachu')
      expect(result).toBe('pikachu')
    })

    it('should handle empty string', () => {
      const result = formatName('')
      expect(result).toBe('')
    })

    it('should handle names with only hyphens (only replaces first hyphen)', () => {
      const result = formatName('--')
      expect(result).toBe(' -')
    })

    it('should handle names starting or ending with hyphens (only replaces first hyphen)', () => {
      const result = formatName('-pokemon-')
      expect(result).toBe(' pokemon-')
    })
  })
})
