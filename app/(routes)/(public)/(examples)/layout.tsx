import { Metadata } from 'next'

import { PokemonHistory } from '@/app/components/ui/pokemon-history'

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Pokémon Gallery Examples',
    default: 'Pokémon Gallery Examples',
  },
  description: 'Here you can find examples of Pokémon Gallery.',
}

const LayoutExamples = ({ children }: ExamplesLayoutProps) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <main>{children}</main>
      <PokemonHistory />
    </div>
  )
}

export default LayoutExamples
