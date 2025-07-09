import type { IPokemonSpecies } from './pokemon.type'

export const formatStatName = (statName: string): string => {
  return statName.replace('-', ' ').replace(/\b\w/g, (l) => {
    return l.toUpperCase()
  })
}

export const getEnglishDescription = (
  species: IPokemonSpecies,
): string | undefined => {
  return species.flavor_text_entries
    .find((entry) => {
      return entry.language.name === 'en'
    })
    ?.flavor_text.replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
}

export const getEnglishGenus = (
  species: IPokemonSpecies,
): string | undefined => {
  return species.genera?.find((genus) => {
    return genus.language.name === 'en'
  })?.genus
}

export const formatGenderRate = (genderRate: number): string => {
  if (genderRate === -1) return 'None'
  return `${(genderRate / 8) * 100}% ♀`
}

export const formatName = (name: string): string => {
  return name.replace('-', ' ')
}
