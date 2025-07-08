'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@/app/components/ui/button'

const Header = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/pokemons', label: 'Pokémons' },
  ]

  return (
    <header className='border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
      <div className='container mx-auto max-w-6xl'>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center space-x-8'>
            <div className='flex space-x-2'>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.href}
                    asLink
                    href={item.href}
                    variant={isActive ? 'primary' : 'secondary'}
                    size='sm'
                    className='shadow-sm'
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
