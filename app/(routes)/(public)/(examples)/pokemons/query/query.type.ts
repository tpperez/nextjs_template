export interface Pokemon {
  url: string
  name: string
  image: string
}

export interface PokemonsResponse {
  pokemons: {
    count: number
    next: string | null
    previous: string | null
    status: boolean
    message: string
    results: Pokemon[]
  }
}
