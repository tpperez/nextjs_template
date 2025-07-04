import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HttpProvider } from './react-query'

vi.mock('../core', () => {
  return {
    HTTP_CONFIG: {
      DEFAULT_STALE_TIME: 5 * 60 * 1000,
      DEFAULT_RETRY_COUNT: 1,
    },
  }
})

vi.mock('@tanstack/react-query', () => {
  const mockQueryClient = vi.fn().mockImplementation((config) => {
    return {
      ...config,
      defaultOptions: config.defaultOptions,
    }
  })

  const mockQueryClientProvider = vi.fn().mockImplementation(({ children }) => {
    return children
  })

  return {
    QueryClient: mockQueryClient,
    QueryClientProvider: mockQueryClientProvider,
  }
})

describe('HttpProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children without errors', () => {
    const testMessage = 'Test child component'
    render(
      <HttpProvider>
        <div>{testMessage}</div>
      </HttpProvider>,
    )

    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })

  it('should handle multiple children', () => {
    render(
      <HttpProvider>
        <div>Child 1</div>
        <div>Child 2</div>
        <span>Child 3</span>
      </HttpProvider>,
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    const { container } = render(<HttpProvider>{null}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should handle null children', () => {
    const { container } = render(<HttpProvider>{null}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should handle undefined children', () => {
    const { container } = render(<HttpProvider>{undefined}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should accept showDevtools prop (even though not implemented)', () => {
    render(
      <HttpProvider showDevtools={true}>
        <div>Test with devtools</div>
      </HttpProvider>,
    )

    expect(screen.getByText('Test with devtools')).toBeInTheDocument()
  })

  it('should work with complex nested components', () => {
    const NestedComponent = () => {
      return (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Click me</button>
        </div>
      )
    }

    render(
      <HttpProvider>
        <NestedComponent />
      </HttpProvider>,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
