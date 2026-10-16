import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import SummaryStats from './components/SummaryStats'
import ToastContainer from './components/ToastContainer'
import useLocalStorage from './hooks/useLocalStorage'
import useToast from './hooks/useToast'
import { useTheme } from './context/ThemeContext'
import type { CategoryFilter, Expense, FilterType } from './types'

function isInPeriod(dateStr: string, period: FilterType): boolean {
  if (period === 'all') return true
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const now = new Date()

  if (period === 'month') {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    )
  }
  // week: Monday 00:00 of the current week up to now
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return date >= start && date <= now
}

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', [])
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [period, setPeriod] = useState<FilterType>('all')
  const { theme, toggleTheme } = useTheme()
  const { toasts, showToast, removeToast } = useToast()

  function handleAdd(data: Omit<Expense, 'id'>): void {
    setExpenses([{ ...data, id: Date.now() }, ...expenses])
    showToast('Expense added')
  }

  function handleDelete(id: number): void {
    setExpenses(expenses.filter(e => e.id !== id))
    showToast('Expense deleted', 'info')
  }

  const visible: Expense[] = expenses.filter(
    e =>
      (category === 'All' || e.category === category) &&
      isInPeriod(e.date, period)
  )

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
        <button className="btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <SummaryStats expenses={visible} />
      <ExpenseForm onAdd={handleAdd} />
      <FilterBar
        category={category}
        period={period}
        onCategoryChange={setCategory}
        onPeriodChange={setPeriod}
      />
      <ExpenseList expenses={visible} onDelete={handleDelete} />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}

export default App
