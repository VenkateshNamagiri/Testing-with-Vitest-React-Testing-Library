import { useState } from 'react'
import useForm from '../hooks/useForm'
import { CATEGORIES } from '../types'
import type { ExpenseFormProps, ExpenseFormValues } from '../types'

const today = (): string => new Date().toISOString().slice(0, 10)

function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const { values, handleChange, reset } = useForm<ExpenseFormValues>({
    title: '',
    amount: '',
    category: 'Food',
    date: today(),
    note: '',
  })
  const [error, setError] = useState<string>('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const amount = parseFloat(values.amount)

    if (!values.title.trim()) return setError('Title is required')
    if (isNaN(amount) || amount <= 0) {
      return setError('Amount must be a positive number')
    }
    if (!values.date) return setError('Date is required')

    onAdd({
      title: values.title.trim(),
      amount,
      category: values.category,
      date: values.date,
      note: values.note.trim() || undefined,
    })
    setError('')
    reset()
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount (₹)"
        value={values.amount}
        onChange={handleChange}
      />
      <select name="category" value={values.category} onChange={handleChange}>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={values.date}
        onChange={handleChange}
      />
      <textarea
        name="note"
        placeholder="Note (optional)"
        value={values.note}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn primary">
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm
