export interface IGraphQLMove {
  move: {
    name: string
    url: string
  }
}

export interface IGraphQLPokemonMoves {
  id: number
  name: string
  moves: IGraphQLMove[]
  message: string
  status: boolean
}

export interface IGraphQLPokemonMovesResponse {
  pokemon: IGraphQLPokemonMoves
}

export type TUsePokemonMovesGraphQLOptions = {
  enabled?: boolean
}

export type TUsePokemonMovesGraphQLReturn = {
  pokemonMoves: IGraphQLPokemonMoves | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  isFetching: boolean
}

export interface IPokemonMovesGraphQLProps {
  pokemonName: string
}
