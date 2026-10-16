import { useState } from 'react'

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

interface UseFormReturn<T> {
  values: T
  handleChange: (e: React.ChangeEvent<FormElement>) => void
  reset: () => void
}

function useForm<T extends object>(initialValues: T): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)

  const handleChange = (e: React.ChangeEvent<FormElement>): void => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const reset = (): void => setValues(initialValues)

  return { values, handleChange, reset }
}

export default useForm
