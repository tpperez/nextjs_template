import type { IPokemonDetail } from '@/app/(routes)/(public)/(examples)/pokemons/[pokemon]/queries'

export interface IViewPokemonProps {
  data: IPokemonDetail
}

export interface IFlavorTextEntry {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export interface IGenus {
  genus: string
  language: {
    name: string
    url: string
  }
}
