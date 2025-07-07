import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import TechRadar from './tech-radar'
import { TECH_RADAR_CONFIG } from './tech-radar.const'
import { IRadarConfig } from './tech-radar.type'

vi.mock('next/script', () => {
  return {
    default: vi.fn(({ children, ...props }) => {
      return <script {...props}>{children}</script>
    }),
  }
})

const mockRadarVisualization = vi.fn()

const mockD3 = {
  select: vi.fn(() => {
    return {
      selectAll: vi.fn(() => {
        return {
          remove: vi.fn(),
        }
      }),
    }
  }),
  symbol: vi.fn(),
  symbolStar: {},
  forceSimulation: vi.fn(),
  forceCollide: vi.fn(),
}

describe('TechRadar Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    Object.defineProperty(window, 'd3', {
      value: mockD3,
      writable: true,
    })

    Object.defineProperty(window, 'radar_visualization', {
      value: mockRadarVisualization,
      writable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
    mockD3.select.mockReturnValue({
      selectAll: vi.fn(() => {
        return {
          remove: vi.fn(),
        }
      }),
    })
  })

  it('should render without errors', () => {
    const { container } = render(<TechRadar />)
    expect(container).toBeInTheDocument()
  })

  it('should render wrapper div with correct classes', () => {
    const { container } = render(<TechRadar />)

    const wrapperDiv = container.firstChild
    expect(wrapperDiv).toHaveClass('h-screen', 'w-full', 'overflow-hidden')
  })

  it('should call radar_visualization after timeout when both scripts are available', () => {
    render(<TechRadar />)
    vi.advanceTimersByTime(100)
    expect(mockRadarVisualization).toHaveBeenCalledWith(TECH_RADAR_CONFIG)
    expect(mockRadarVisualization).toHaveBeenCalledTimes(1)
  })

  it('should call radar_visualization with custom config', () => {
    const customConfig: IRadarConfig = {
      ...TECH_RADAR_CONFIG,
      svg_id: 'custom-radar',
    }

    render(<TechRadar config={customConfig} />)

    vi.advanceTimersByTime(100)

    expect(mockRadarVisualization).toHaveBeenCalledWith(customConfig)
  })

  it('should cleanup timeout on unmount when scripts are loaded', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const { unmount } = render(<TechRadar />)

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })
})
