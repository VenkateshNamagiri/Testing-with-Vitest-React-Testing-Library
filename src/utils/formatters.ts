import type { Expense, FilterType } from '../types'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return 'Invalid date'
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function getTotalByCategory(
  expenses: Expense[],
  category: string
): number {
  return expenses
    .filter(e => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0)
}

export function filterExpenses(
  expenses: Expense[],
  category: string,
  period: FilterType
): Expense[] {
  const now = new Date()
  const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000

  return expenses.filter(e => {
    const matchesCategory = category === 'All' || e.category === category
    const d = new Date(e.date)
    let matchesPeriod = true
    if (period === 'week') {
      matchesPeriod = d.getTime() >= weekAgo
    } else if (period === 'month') {
      matchesPeriod =
        d.getUTCMonth() === now.getUTCMonth() &&
        d.getUTCFullYear() === now.getUTCFullYear()
    }
    return matchesCategory && matchesPeriod
  })
}