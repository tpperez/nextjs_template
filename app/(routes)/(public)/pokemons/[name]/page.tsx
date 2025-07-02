import { notFound } from 'next/navigation'
import { getPokemonDetailData } from './query'
import { ViewPokemonDetail } from '@/app/views/pokemon-detail'

interface PokemonPageProps {
  params: Promise<{
    name: string
  }>
}

const PokemonDetailPage = async ({ params }: PokemonPageProps) => {
  const { name } = await params
  const pokemonData = await getPokemonDetailData(name)

  if (!pokemonData.success || !pokemonData.data) {
    notFound()
  }

  return <ViewPokemonDetail data={pokemonData.data} />
}

export default PokemonDetailPage
