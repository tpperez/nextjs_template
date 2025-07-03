import Link from 'next/link'

const PokemonNotFound = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-6'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-6 text-center'>
            <h1 className='mb-1 text-3xl font-bold text-gray-800'>
              Pokémon Not Found
            </h1>
            <div className='inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700'>
              <span className='mr-2 h-1.5 w-1.5 rounded-full bg-red-500'></span>
              REST + Server-Side Rendered
            </div>
          </div>

          <div className='mx-auto max-w-md'>
            <div className='rounded-xl border border-red-200 bg-red-50 p-8 text-center'>
              <div className='mb-4 text-6xl'>🔍</div>
              <h3 className='mb-3 text-2xl font-bold text-red-800'>
                Pokémon Not Found
              </h3>
              <p className='mb-4 text-red-600'>
                The Pokémon you are looking for does not exist or the name might
                be misspelled.
              </p>
              <Link
                href='/pokemons'
                className='inline-flex items-center rounded-lg border border-blue-300 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white transition-colors hover:from-blue-600 hover:to-blue-700'
              >
                Back to Pokémon Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonNotFound
