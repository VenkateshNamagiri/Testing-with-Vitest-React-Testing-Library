import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseCard from '../ExpenseCard'
import type { Expense } from '../../types'

const mockExpense: Expense = {
  id: 1,
  title: 'Lunch',
  amount: 250,
  category: 'Food',
  date: '2025-08-06',
}

describe('ExpenseCard', () => {
  it('renders the expense title', () => {
    render(<ExpenseCard expense={mockExpense} onDelete={() => {}} />)
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })

  it('renders the formatted amount', () => {
    render(<ExpenseCard expense={mockExpense} onDelete={() => {}} />)
    expect(screen.getByText('₹250.00')).toBeInTheDocument()
  })

  it('renders the category badge', () => {
    render(<ExpenseCard expense={mockExpense} onDelete={() => {}} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
  })

  it('has a delete button', () => {
    render(<ExpenseCard expense={mockExpense} onDelete={() => {}} />)
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('calls onDelete with the correct id when delete is clicked', async () => {
    const onDelete = vi.fn()
    render(<ExpenseCard expense={mockExpense} onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})