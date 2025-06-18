import { render, screen } from '@testing-library/react'

import ViewPage1 from './sample-1'

import '@testing-library/jest-dom'

describe('Component Page Home', () => {
  it('renders a heading', () => {
    render(<ViewPage1 />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
