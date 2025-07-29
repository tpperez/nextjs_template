import Image from 'next/image'
import Link from 'next/link'

import Button from '@/app/components/ui/button'

import getHeaderData from './queries'

const Header = async () => {
  const { success, data, error } = await getHeaderData()

  if (!success || !data) {
    console.error('error loading header data:', error)
    return null
  }

  const { header } = data

  return (
    <header className='border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
      <div className='container mx-auto w-[90%] max-w-6xl'>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center space-x-8'>
            <Link
              href='/'
              className='flex items-center'
            >
              <Image
                src={header.logo.url}
                alt={header.logo.alt}
                title={header.logo.title}
                width={40}
                height={40}
                className='h-10 w-auto object-contain'
              />
            </Link>

            <div className='flex space-x-2'>
              {header.menulinks.map((item) => {
                return (
                  <Button
                    key={item.id}
                    asLink
                    href={item.url}
                    variant={'secondary'}
                    size='sm'
                    className='shadow-sm'
                    target='_blank'
                  >
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
