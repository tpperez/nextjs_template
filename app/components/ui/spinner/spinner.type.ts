export interface ISpinnerProps {
  size?: TSpinnerSize
  color?: TSpinnerColor
  text?: string
  className?: string
}

export type TSpinnerSize = 'sm' | 'md' | 'lg'

export type TSpinnerColor = 'blue' | 'gray' | 'green' | 'purple' | 'red'
