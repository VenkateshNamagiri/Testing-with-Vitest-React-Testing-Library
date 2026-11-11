import { render, screen } from '@testing-library/react'
import SummaryStats from '../SummaryStats'
import type { Expense } from '../../types'

const expenses: Expense[] = [
  { id: 1, title: 'Lunch', amount: 200, category: 'Food', date: '2025-08-20' },
  { id: 2, title: 'Bus', amount: 50, category: 'Transport', date: '2025-08-17' },
  { id: 3, title: 'Dinner', amount: 300, category: 'Food', date: '2025-08-05' },
  { id: 4, title: 'Book', amount: 400, category: 'Education', date: '2025-07-25' },
]

describe('SummaryStats', () => {
  it('renders the total amount correctly', () => {
    render(<SummaryStats expenses={expenses} />)
    expect(screen.getByText('₹950.00')).toBeInTheDocument()
  })

  it('renders the highest expense correctly', () => {
    render(<SummaryStats expenses={expenses} />)
    expect(screen.getByText('Book (₹400.00)')).toBeInTheDocument()
  })

  it('renders the most used category correctly', () => {
    render(<SummaryStats expenses={expenses} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
  })

  it('shows zero total when the expense array is empty', () => {
    render(<SummaryStats expenses={[]} />)
    expect(screen.getByText('₹0.00')).toBeInTheDocument()
  })

  it('shows dashes for highest and category when empty', () => {
    render(<SummaryStats expenses={[]} />)
    expect(screen.getAllByText('—')).toHaveLength(2)
  })
})