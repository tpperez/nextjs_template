import { fireEvent, render, screen } from '@testing-library/react'
import Cookies from 'js-cookie'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { TOKEN_COOKIE_NAME } from '../../token'

import DevTokenSetter from './dev-token-setter'

vi.mock('js-cookie', () => {
  return {
    default: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  }
})

const reloadMock = vi.fn()

beforeEach(() => {
  vi.resetAllMocks()
  Object.defineProperty(window, 'location', {
    value: { reload: reloadMock },
    writable: true,
  })
})

describe('<DevTokenSetter />', () => {
  it('renders collapsed button with no token', () => {
    const getMock = Cookies.get as Mock
    getMock.mockReturnValue(undefined)
    render(<DevTokenSetter />)
    expect(screen.getByText('Set token (dev)')).toBeInTheDocument()
  })

  it('renders collapsed button with token', () => {
    const getMock = Cookies.get as Mock
    getMock.mockReturnValue('mock.token')
    render(<DevTokenSetter />)
    expect(screen.getByText('Change token (dev)')).toBeInTheDocument()
  })

  it('expands UI on click and allows typing JWT', () => {
    render(<DevTokenSetter />)
    fireEvent.click(screen.getByRole('button'))
    const textarea = screen.getByPlaceholderText('Paste your JWT here')
    fireEvent.change(textarea, { target: { value: 'abc.def.ghi' } })
    expect(textarea).toHaveValue('abc.def.ghi')
  })

  it('shows error if submitting empty JWT', () => {
    render(<DevTokenSetter />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Set token'))
    expect(screen.getByText('Invalid JWT')).toBeInTheDocument()
    expect(Cookies.set).not.toHaveBeenCalled()
    expect(reloadMock).not.toHaveBeenCalled()
  })

  it('sets cookie and reloads page on valid JWT', () => {
    render(<DevTokenSetter />)
    fireEvent.click(screen.getByRole('button'))
    const textarea = screen.getByPlaceholderText('Paste your JWT here')
    fireEvent.change(textarea, { target: { value: 'abc.def.ghi' } })
    fireEvent.click(screen.getByText('Set token'))
    expect(Cookies.set).toHaveBeenCalledWith(
      TOKEN_COOKIE_NAME,
      'abc.def.ghi',
      expect.objectContaining({
        sameSite: 'Strict',
        secure: false,
        path: '/',
        expires: expect.any(Date),
      }),
    )
    expect(screen.getByText('Token set. Reloading...')).toBeInTheDocument()
    expect(reloadMock).toHaveBeenCalled()
  })

  it('clears cookie and reloads page', () => {
    const getMock = Cookies.get as Mock
    getMock.mockReturnValue('existing.token')
    render(<DevTokenSetter />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Clear token'))
    expect(Cookies.remove).toHaveBeenCalledWith(TOKEN_COOKIE_NAME)
    expect(reloadMock).toHaveBeenCalled()
  })

  it('closes expanded panel on Cancel', () => {
    render(<DevTokenSetter />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.getByText('Set token (dev)')).toBeInTheDocument()
  })
})
