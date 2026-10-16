import ExpenseCard from './ExpenseCard'
import type { ExpenseListProps } from '../types'

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses found.</p>
  }
  return (
    <div className="list">
      {expenses.map(expense => (
        <ExpenseCard key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default ExpenseList
