import { useForm } from 'react-hook-form'

import type { IPokemonSearchProps } from './pokemon-search.type'

export const PokemonSearch = ({
  onSearch,
  isLoading = false,
}: IPokemonSearchProps) => {
  const { register, handleSubmit, watch, reset } = useForm<{ search: string }>()
  const searchValue = watch('search', '')

  const onSubmit = (data: { search: string }) => {
    onSearch(data.search)
  }

  const handleClear = () => {
    onSearch('')
    reset({ search: '' })
  }

  return (
    <div className='mb-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 sm:flex-row'
      >
        <div className='flex-1'>
          <input
            {...register('search')}
            type='text'
            placeholder='Search Pokémon by name...'
            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={isLoading}
          />
        </div>
        <div className='flex gap-2'>
          <button
            type='submit'
            disabled={isLoading || !searchValue.trim()}
            className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          {searchValue && (
            <button
              type='button'
              onClick={handleClear}
              disabled={isLoading}
              className='rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
