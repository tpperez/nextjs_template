import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ViewHome from './home'

vi.mock('next/headers', () => {
  return {
    headers: vi.fn(() => {
      return Promise.resolve({
        get: vi.fn(() => {
          return 'mock-nonce-value'
        }),
      })
    }),
  }
})

vi.mock('./components/tech-radar', () => {
  return {
    default: vi.fn(() => {
      return <div data-testid='tech-radar'>Tech Radar Component</div>
    }),
  }
})

describe('ViewHome Component', () => {
  it('should render without errors', async () => {
    const ViewHomeResolved = await ViewHome()
    const { container } = render(ViewHomeResolved)
    expect(container).toBeInTheDocument()
  })

  it('should render TechRadar component', async () => {
    const ViewHomeResolved = await ViewHome()
    render(ViewHomeResolved)
    expect(screen.getByTestId('tech-radar')).toBeInTheDocument()
    expect(screen.getByText('Tech Radar Component')).toBeInTheDocument()
  })
})
