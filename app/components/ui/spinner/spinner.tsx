import { cn } from '@/app/utils/cn'

import { SPINNER_COLOR_CLASSES, SPINNER_SIZE_CLASSES } from './spinner.const'
import type { ISpinnerProps } from './spinner.type'

export const Spinner = ({
  size = 'md',
  color = 'blue',
  text,
  className,
}: ISpinnerProps) => {
  const containerClasses = cn('flex items-center justify-center p-6', className)
  const spinnerClasses = cn(
    'animate-spin rounded-full border-b-2',
    SPINNER_SIZE_CLASSES[size],
    SPINNER_COLOR_CLASSES[color],
  )

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses} />
      {text && <span className='ml-2 text-sm text-gray-600'>{text}</span>}
    </div>
  )
}
