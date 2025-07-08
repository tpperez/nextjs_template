import { createElement } from 'react'

import { vi } from 'vitest'

import '@testing-library/jest-dom'

// mock next.js router
vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => {
      return {
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
      }
    }),
    usePathname: vi.fn(() => {
      return '/'
    }),
  }
})

// mock next.js image
vi.mock('next/image', () => {
  return {
    default: vi.fn(() => {
      return 'NextImage'
    }),
  }
})

// mock next.js link
vi.mock('next/link', () => {
  return {
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode
      href: string
      [key: string]: unknown
    }) => {
      return createElement('a', { href, ...props }, children)
    },
  }
})
