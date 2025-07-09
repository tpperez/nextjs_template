import { forwardRef } from 'react'

import Link from 'next/link'

import cn from '@/app/utils/cn'

import type { IButtonProps } from './button.type'

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      asLink = false,
      href,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    ]

    const variants = {
      primary: [
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        'border border-blue-600',
      ],
      secondary: [
        'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-black focus:ring-blue-500',
      ],
      ghost: [
        'bg-transparent text-gray-700 hover:bg-gray-50 hover:text-black focus:ring-blue-500',
      ],
      danger: [
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        'border border-red-600',
      ],
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className,
    )

    const isDisabled = disabled || isLoading

    const content = (
      <>
        {isLoading && (
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
        )}
        {!isLoading && leftIcon && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon && rightIcon}
      </>
    )

    if (asLink && href) {
      return (
        <Link
          href={href}
          className={buttonClasses}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
