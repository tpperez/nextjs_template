import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/app/components/ui/button'

import type { IPokemonSearchProps } from './pokemon-search.type'

const searchSchema = z.object({
  search: z
    .string()
    .min(2, 'Please enter at least 2 characters')
    .max(50, 'Search term is too long'),
})

type TSearchSchema = z.infer<typeof searchSchema>

export const PokemonSearch = ({
  onSearch,
  isLoading = false,
}: IPokemonSearchProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TSearchSchema>({
    resolver: zodResolver(searchSchema),
  })
  const searchValue = watch('search', '')

  const onSubmit = (data: TSearchSchema) => {
    onSearch(data.search)
  }

  const handleClear = () => {
    onSearch('')
    reset({ search: '' })
  }

  return (
    <div className='mb-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 sm:flex-row'>
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
            <Button
              type='submit'
              disabled={!searchValue.trim()}
              isLoading={isLoading}
              loadingText='Searching...'
              variant='primary'
            >
              Search
            </Button>
            {searchValue && (
              <Button
                type='button'
                onClick={handleClear}
                disabled={isLoading}
                variant='secondary'
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className='flex-1'>
          {errors.search && (
            <p className='mt-1 text-sm text-red-500'>{errors.search.message}</p>
          )}
        </div>
      </form>
    </div>
  )
}
