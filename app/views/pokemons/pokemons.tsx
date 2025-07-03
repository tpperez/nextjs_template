import { PokemonCard } from './components/pokemon-card'
import { POKEMON_GALLERY_CONFIG } from './pokemons.const'
import type { IPokemonsViewProps } from './pokemons.type'

export const ViewPokemons = ({ success, data, error }: IPokemonsViewProps) => {
  const {
    TITLE,
    SUBTITLE,
    BADGE_TEXT,
    API_LINK,
    CACHE_DURATION,
    ERROR_TITLE,
    ERROR_MESSAGE,
    NO_RESULTS_MESSAGE,
  } = POKEMON_GALLERY_CONFIG

  if (!success) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 text-center'>
              <h1 className='mb-4 text-5xl font-bold text-black'>{TITLE}</h1>
              <p className='mb-2 text-xl text-gray-600'>{SUBTITLE}</p>
              <div className='inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800'>
                <span className='mr-2 h-2 w-2 rounded-full bg-gray-600'></span>
                {BADGE_TEXT}
              </div>
            </div>

            <div className='mx-auto max-w-md'>
              <div className='rounded-xl border border-gray-300 bg-white p-8 text-center shadow-lg'>
                <div className='mb-4 text-6xl'>⚠️</div>
                <h3 className='mb-3 text-2xl font-bold text-black'>
                  {ERROR_TITLE}
                </h3>
                <p className='text-gray-600'>{ERROR_MESSAGE}</p>
                {error && <p className='mt-2 text-sm text-gray-500'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h1 className='mb-4 text-5xl font-bold text-black'>{TITLE}</h1>
            <p className='mb-2 text-xl text-gray-600'>{SUBTITLE}</p>
            <div className='mb-2 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800'>
              <span className='mr-2 h-2 w-2 rounded-full bg-gray-600'></span>
              {BADGE_TEXT}
            </div>
            <p className='text-gray-500'>
              Using{' '}
              <a
                href={API_LINK}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-black underline hover:text-gray-700'
              >
                GraphQL PokeAPI
              </a>
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                />
              )
            })}
          </div>

          {data.length === 0 && (
            <div className='mt-12 text-center text-gray-500'>
              <div className='mb-4 text-6xl'>🔍</div>
              <p className='text-xl'>{NO_RESULTS_MESSAGE}</p>
            </div>
          )}

          <div className='mt-12 text-center'>
            <div className='inline-flex items-center space-x-4 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm text-gray-600 shadow-sm'>
              <div className='flex items-center space-x-2'>
                <span>🔄</span>
                <span>Cache: {CACHE_DURATION}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>⚡</span>
                <span>Server-side rendered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
