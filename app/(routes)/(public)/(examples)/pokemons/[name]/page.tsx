import { notFound } from 'next/navigation'

import { ViewPokemonDetail } from '@/app/views/pokemon-detail'

import { getPokemonDetailData } from './queries'

interface PokemonPageProps {
  params: Promise<{
    name: string
  }>
}

const PagePokemonDetail = async ({ params }: PokemonPageProps) => {
  const { name } = await params
  const pokemonData = await getPokemonDetailData(name)

  if (!pokemonData.success || !pokemonData.data) {
    notFound()
  }

  return <ViewPokemonDetail data={pokemonData.data} />
}

export default PagePokemonDetail
