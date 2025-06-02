import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ComponentPageAbout from './about'

describe('Component Page About', () => {
  it('renders a heading', () => {
    render(<ComponentPageAbout />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
