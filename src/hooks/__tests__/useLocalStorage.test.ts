import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when the key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage('expenses', ['empty']))

    expect(result.current[0]).toEqual(['empty'])
  })

  it('returns the stored value when the key exists', () => {
    localStorage.setItem('name', JSON.stringify('Ravi'))

    const { result } = renderHook(() => useLocalStorage('name', 'default'))

    expect(result.current[0]).toBe('Ravi')
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('name', 'default'))

    act(() => {
      result.current[1]('Kumar')
    })

    expect(result.current[0]).toBe('Kumar')
    expect(localStorage.getItem('name')).toBe(JSON.stringify('Kumar'))
  })
})