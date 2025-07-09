import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error 404 - Page Not Found',
  description: 'Sorry, we could not find the page you were looking for...',
  robots: 'noindex, nofollow',
}

const NotFoundRoot = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='mb-4 text-9xl font-bold text-gray-800'>404</h1>
        <p className='text-xl text-gray-600'>Page Not Found</p>
      </div>
    </div>
  )
}

export default NotFoundRoot
