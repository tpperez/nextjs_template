export interface IPokemonSearchProps {
  onSearch: (search: string) => void
  isLoading?: boolean
}

export interface IPokemonSearchResult {
  id: number
  name: string
  sprites: {
    front_default: string | null
  }
  species: {
    name: string
    url: string
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

export interface IPokemonSearchResponse {
  pokemon: IPokemonSearchResult
}
