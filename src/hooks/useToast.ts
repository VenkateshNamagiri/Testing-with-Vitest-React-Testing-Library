import { useState } from 'react'
import type { Toast, ToastType } from '../types'

interface UseToastReturn {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType) => void
  removeToast: (id: number) => void
}

function useToast(duration: number = 3000): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = (id: number): void => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const showToast = (message: string, type: ToastType = 'success'): void => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), duration)
  }

  return { toasts, showToast, removeToast }
}

export default useToast
