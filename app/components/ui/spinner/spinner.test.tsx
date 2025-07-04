import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './spinner'

describe('Spinner Component', () => {
  it('should render without errors', () => {
    const { container } = render(<Spinner />)
    expect(container).toBeInTheDocument()
  })

  it('should render with text', () => {
    const testText = 'some text'
    render(<Spinner text={testText} />)
    expect(screen.getByText(testText)).toBeInTheDocument()
    const textElement = screen.getByText(testText)
    expect(textElement.tagName).toBe('SPAN')
  })
})
