import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ViewHome from './home'

vi.mock('./components/tech-radar', () => {
  return {
    default: vi.fn(() => {
      return <div data-testid='tech-radar'>Tech Radar Component</div>
    }),
  }
})

describe('ViewHome Component', () => {
  it('should render without errors', () => {
    const { container } = render(<ViewHome />)
    expect(container).toBeInTheDocument()
  })

  it('should render TechRadar component', () => {
    render(<ViewHome />)
    expect(screen.getByTestId('tech-radar')).toBeInTheDocument()
    expect(screen.getByText('Tech Radar Component')).toBeInTheDocument()
  })
})
