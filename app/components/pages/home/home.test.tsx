import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ComponentPageHome from './home'

describe('Component Page Home', () => {
  it('renders a heading', () => {
    render(<ComponentPageHome />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
