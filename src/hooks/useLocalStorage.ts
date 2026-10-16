import { useState } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T): void => {
    setStored(value)
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or unavailable - keep in-memory state only
    }
  }

  return [stored, setValue]
}

export default useLocalStorage
