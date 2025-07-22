import Footer from '@/app/components/structure/footer'
import Header from '@/app/components/structure/header'
import PokemonHistory from '@/app/components/ui/pokemon-history'

interface PokemonsLayoutProps {
  children: React.ReactNode
}

const LayoutPokemons = ({ children }: PokemonsLayoutProps) => {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <main>{children}</main>
        <PokemonHistory />
      </div>
      <Footer />
    </>
  )
}

export default LayoutPokemons
