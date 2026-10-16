import type { Category, Expense, SummaryStatsProps } from '../types'

function getTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0)
}

function getHighest(expenses: Expense[]): Expense | null {
  if (expenses.length === 0) return null
  return expenses.reduce((max, e) => (e.amount > max.amount ? e : max))
}

function getMostUsedCategory(expenses: Expense[]): Category | null {
  if (expenses.length === 0) return null
  const counts: Partial<Record<Category, number>> = {}
  for (const e of expenses) {
    counts[e.category] = (counts[e.category] ?? 0) + 1
  }
  let best: Category | null = null
  let bestCount = 0
  for (const [cat, count] of Object.entries(counts) as [Category, number][]) {
    if (count > bestCount) {
      best = cat
      bestCount = count
    }
  }
  return best
}

function SummaryStats({ expenses }: SummaryStatsProps) {
  const highest = getHighest(expenses)
  const topCategory = getMostUsedCategory(expenses)

  return (
    <div className="stats">
      <div className="card stat">
        <span className="label">Total Spent</span>
        <strong>₹{getTotal(expenses).toFixed(2)}</strong>
      </div>
      <div className="card stat">
        <span className="label">Highest Expense</span>
        <strong>
          {highest ? `${highest.title} (₹${highest.amount.toFixed(2)})` : '—'}
        </strong>
      </div>
      <div className="card stat">
        <span className="label">Most Used Category</span>
        <strong>{topCategory ?? '—'}</strong>
      </div>
    </div>
  )
}

export default SummaryStats
