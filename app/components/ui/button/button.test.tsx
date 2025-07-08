import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import Button from './button'

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-600')
  })

  it('renders with secondary variant when specified', () => {
    render(<Button variant='secondary'>Secondary</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-white')
  })

  it('renders with ghost variant when specified', () => {
    render(<Button variant='ghost'>Ghost</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-transparent')
  })

  it('renders with danger variant when specified', () => {
    render(<Button variant='danger'>Danger</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-600')
  })

  it('renders with medium size by default', () => {
    render(<Button>Medium</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-3')
  })

  it('renders with small size when specified', () => {
    render(<Button size='sm'>Small</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-4', 'py-2')
  })

  it('renders with large size when specified', () => {
    render(<Button size='lg'>Large</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-8', 'py-4')
  })

  it('shows loading state correctly', () => {
    render(
      <Button
        isLoading
        loadingText='Loading...'
      >
        Submit
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Loading...')
    expect(button).toBeDisabled()
  })

  it('shows loading spinner when loading', () => {
    render(<Button isLoading>Submit</Button>)

    const button = screen.getByRole('button')
    const spinner = button.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('is disabled when loading', () => {
    render(<Button isLoading>Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with left icon', () => {
    render(<Button leftIcon='👈'>With Icon</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('👈')
  })

  it('renders with right icon', () => {
    render(<Button rightIcon='👉'>With Icon</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('👉')
  })

  it('renders as Link when asLink is true', () => {
    render(
      <Button
        asLink
        href='/test'
      >
        Link Button
      </Button>,
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Button type='submit'>Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
