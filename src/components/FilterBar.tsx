import { CATEGORIES } from '../types'
import type { CategoryFilter, FilterBarProps, FilterType } from '../types'

const PERIODS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

function FilterBar({
  category,
  period,
  onCategoryChange,
  onPeriodChange,
}: FilterBarProps) {
  function handleCategory(e: React.ChangeEvent<HTMLSelectElement>): void {
    onCategoryChange(e.target.value as CategoryFilter)
  }

  return (
    <div className="card filters">
      <select value={category} onChange={handleCategory}>
        <option value="All">All Categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="periods">
        {PERIODS.map(p => (
          <button
            key={p.value}
            className={`btn ${period === p.value ? 'primary' : ''}`}
            onClick={() => onPeriodChange(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
