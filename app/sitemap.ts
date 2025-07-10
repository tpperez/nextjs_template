import { MetadataRoute } from 'next'

import getPokemonsData from '@/app/(routes)/(public)/(examples)/pokemons/queries'
import { BASE_URL } from '@/app/constants/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/pokemons`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  let pokemonRoutes: MetadataRoute.Sitemap = []

  try {
    const pokemonsData = await getPokemonsData(8, 0)

    if (pokemonsData.success) {
      pokemonRoutes = pokemonsData.data.map((pokemon) => {
        return {
          url: `${BASE_URL}/pokemons/${pokemon.name}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        }
      })
    }
  } catch (error) {
    console.error('Error generating sitemap for Pokemon pages:', error)
  }

  return [...staticRoutes, ...pokemonRoutes]
}
