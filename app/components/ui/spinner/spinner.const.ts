import type { TSpinnerSize, TSpinnerColor } from './spinner.type'

export const SPINNER_SIZE_CLASSES: Record<TSpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

export const SPINNER_COLOR_CLASSES: Record<TSpinnerColor, string> = {
  blue: 'border-blue-400',
  gray: 'border-gray-400',
  green: 'border-green-400',
  purple: 'border-purple-400',
  red: 'border-red-400',
}
