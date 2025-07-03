import { PokemonHistory } from '@/app/components/ui/pokemon-history'

interface ExamplesLayoutProps {
  children: React.ReactNode
}

const ExamplesLayout = ({ children }: ExamplesLayoutProps) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <main>{children}</main>
      <PokemonHistory />
    </div>
  )
}

export default ExamplesLayout
