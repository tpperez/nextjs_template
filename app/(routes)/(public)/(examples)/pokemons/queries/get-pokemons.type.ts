export interface IPokemonsResponse {
  pokemons: {
    count: number
    next: string | null
    previous: string | null
    status: boolean
    message: string
    results: IPokemon[]
  }
}

export interface IPokemon {
  url: string
  name: string
  image: string
}
