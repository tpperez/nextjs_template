'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </Link>
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
