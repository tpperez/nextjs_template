import { render, screen } from '@testing-library/react'

import ViewHome from './home'

import '@testing-library/jest-dom'

describe('Component Page Home', () => {
  it('renders a heading', () => {
    render(<ViewHome />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
