/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'
import { act } from 'react-dom/test-utils'


describe('useDebounce', () => {
  it('should update value after specified delay', async () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(({ value, delay }: { value: string, delay: number }) => useDebounce(value, delay), {
      initialProps: { value: 'test', delay: 500 },
    })

    expect(result.current).toBe('test') // Check initial value

    // Update value
    rerender({ value: 'updated', delay: 500 })
    expect(result.current).toBe('test') // Value should not update immediately due to debounce

    // After specified delay
    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated') // Value should update after the delay
  })
})