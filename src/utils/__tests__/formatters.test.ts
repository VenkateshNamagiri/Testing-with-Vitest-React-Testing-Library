import { formatCurrency, formatDate, getTotalByCategory, filterExpenses } from '../formatters'
import type { Expense } from '../../types'

describe('formatCurrency', () => {
  it('formats a positive number with rupee symbol', () => {
    expect(formatCurrency(1500)).toBe('₹1,500.00')
  })
  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('₹0.00')
  })
  it('handles negative amounts', () => {
    expect(formatCurrency(-500)).toBe('-₹500.00')
  })
  it('formats large numbers', () => {
    expect(formatCurrency(1234567)).toBe('₹12,34,567.00')
  })
})

describe('formatDate', () => {
  it('formats a valid date', () => {
    expect(formatDate('2025-08-06')).toBe('6 Aug 2025')
  })
  it('returns a fallback for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date')
  })
})

const expenses: Expense[] = [
  { id: 1, title: 'Lunch', amount: 200, category: 'Food', date: '2025-08-20' },
  { id: 2, title: 'Bus', amount: 50, category: 'Transport', date: '2025-08-17' },
  { id: 3, title: 'Dinner', amount: 300, category: 'Food', date: '2025-08-05' },
  { id: 4, title: 'Book', amount: 400, category: 'Education', date: '2025-07-25' },
]

describe('getTotalByCategory', () => {
  it('sums amounts for a matching category', () => {
    expect(getTotalByCategory(expenses, 'Food')).toBe(500)
  })
  it('returns 0 when no category matches', () => {
    expect(getTotalByCategory(expenses, 'Health')).toBe(0)
  })
  it('returns 0 for an empty array', () => {
    expect(getTotalByCategory([], 'Food')).toBe(0)
  })
})

describe('filterExpenses', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-08-20T12:00:00Z'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('filters by category', () => {
    expect(filterExpenses(expenses, 'Food', 'all')).toHaveLength(2)
  })
  it('returns everything for All + all', () => {
    expect(filterExpenses(expenses, 'All', 'all')).toHaveLength(4)
  })
  it('filters by week', () => {
    expect(filterExpenses(expenses, 'All', 'week').map(e => e.id)).toEqual([1, 2])
  })
  it('filters by month', () => {
    expect(filterExpenses(expenses, 'All', 'month').map(e => e.id)).toEqual([1, 2, 3])
  })
  it('combines category and period filters', () => {
    expect(filterExpenses(expenses, 'Food', 'week').map(e => e.id)).toEqual([1])
  })
})