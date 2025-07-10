import { describe, expect, it } from 'vitest'

import cn from './cn'

describe('cn utility function', () => {
  it('should merge basic classes', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const result = cn('class1', true && 'class2', false && 'class3')
    expect(result).toBe('class1 class2')
  })

  it('should handle objects with conditional classes', () => {
    const result = cn({
      class1: true,
      class2: false,
      class3: true,
    })
    expect(result).toBe('class1 class3')
  })

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should handle tailwind class conflicts by merging them', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })

  it('should handle padding conflicts', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('should handle margin conflicts', () => {
    const result = cn('m-2', 'm-4')
    expect(result).toBe('m-4')
  })

  it('should handle complex class merging', () => {
    const result = cn(
      'px-4 py-2 bg-blue-500 text-white',
      'px-6 bg-red-500',
      'hover:bg-red-600',
    )
    expect(result).toBe('py-2 text-white px-6 bg-red-500 hover:bg-red-600')
  })

  it('should handle custom border widths (merged by tailwind-merge)', () => {
    const result = cn('border-thin', 'border-regular')
    expect(result).toBe('border-regular')
  })

  it('should handle prefix classes (concatenated since custom)', () => {
    const result = cn('y-border-thin', 'y-border-regular')
    expect(result).toBe('y-border-thin y-border-regular')
  })

  it('should handle standard border width conflicts', () => {
    const result = cn('border-2', 'border-4')
    expect(result).toBe('border-4')
  })

  it('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle null and undefined inputs', () => {
    const result = cn(null, undefined, 'class1', null, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle mixed input types', () => {
    const result = cn(
      'base-class',
      { conditional: true, 'not-included': false },
      ['array-class1', 'array-class2'],
      'final-class',
    )
    expect(result).toBe(
      'base-class conditional array-class1 array-class2 final-class',
    )
  })
})
