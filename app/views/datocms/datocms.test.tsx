import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ViewDatocms from './datocms'

vi.mock('./components/section-with-cards', () => {
  return {
    default: vi.fn(() => {
      return <div data-testid='section-with-cards'>Cards</div>
    }),
  }
})

vi.mock('./components/section-with-content', () => {
  return {
    default: vi.fn(() => {
      return <div data-testid='section-with-content'>Content</div>
    }),
  }
})

vi.mock('./components/section-with-icons', () => {
  return {
    default: vi.fn(() => {
      return <div data-testid='section-with-icons'>Icons</div>
    }),
  }
})

describe('ViewDatocms', () => {
  it('should rende erro message when `success` is false', () => {
    render(
      <ViewDatocms
        success={false}
        error='Erro simulado'
      />,
    )

    expect(screen.getByText('Error al cargar el contenido')).toBeInTheDocument()
    expect(screen.getByText('Erro simulado')).toBeInTheDocument()
  })

  it('should render all components when `success` is true', () => {
    render(
      <ViewDatocms
        success
        data={{
          sectionone: {
            title: 'Title 1',
            description: 'Description 1',
            items: [],
          },
          sectiontwo: {
            title: 'Title 2',
            description: 'Description 2',
            image: {
              url: 'https://example.com/image.jpg',
            },
          },
          sectionthree: {
            title: 'Title 3',
            description: 'Description 3',
            items: [],
          },
        }}
      />,
    )

    expect(screen.getByTestId('section-with-cards')).toBeInTheDocument()
    expect(screen.getByTestId('section-with-content')).toBeInTheDocument()
    expect(screen.getByTestId('section-with-icons')).toBeInTheDocument()
  })
})
