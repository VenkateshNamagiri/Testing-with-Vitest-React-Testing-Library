import type { ExpenseCardProps } from '../types'

function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  return (
    <div className="card expense">
      <div className="expense-head">
        <h3>{expense.title}</h3>
        <span className="amount">₹{expense.amount.toFixed(2)}</span>
      </div>
      <div className="meta">
        <span className="badge">{expense.category}</span>
        <span>{expense.date}</span>
      </div>
      {expense.note && <p className="note">{expense.note}</p>}
      <button className="btn danger" onClick={() => onDelete(expense.id)}>
        Delete
      </button>
    </div>
  )
}

export default ExpenseCard
