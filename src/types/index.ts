export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Health'
  | 'Education'
  | 'Other'

export type FilterType = 'all' | 'week' | 'month'

export type CategoryFilter = Category | 'All'

export type Theme = 'light' | 'dark'

export type ToastType = 'success' | 'error' | 'info'

export interface Expense {
  id: number
  title: string
  amount: number
  category: Category
  date: string // YYYY-MM-DD
  note?: string
}

export interface ExpenseFormValues {
  title: string
  amount: string
  category: Category
  date: string
  note: string
}

export interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void
}

export interface ExpenseCardProps {
  expense: Expense
  onDelete: (id: number) => void
}

export interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: number) => void
}

export interface FilterBarProps {
  category: CategoryFilter
  period: FilterType
  onCategoryChange: (category: CategoryFilter) => void
  onPeriodChange: (period: FilterType) => void
}

export interface SummaryStatsProps {
  expenses: Expense[]
}

export interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: number) => void
}

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Shopping',
  'Health',
  'Education',
  'Other',
]
