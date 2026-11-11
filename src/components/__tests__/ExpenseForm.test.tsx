import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseForm from '../ExpenseForm'

describe('ExpenseForm', () => {
  it('renders all form fields', () => {
    const { container } = render(<ExpenseForm onAdd={() => {}} />)

    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/note/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add expense/i })
    ).toBeInTheDocument()
  })

  it('shows an error when submitted with an empty title', async () => {
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)

    await userEvent.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('shows an error when the amount is zero', async () => {
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText(/title/i), 'Coffee')
    await userEvent.type(screen.getByPlaceholderText(/amount/i), '0')
    await userEvent.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByText(/amount must be a positive number/i)).toBeInTheDocument()
    expect(onAdd).not.toHaveBeenCalled()
  })

    it('shows an error when the amount is negative', async () => {
    const onAdd = vi.fn()
    const { container } = render(<ExpenseForm onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText(/title/i), 'Coffee')
    await userEvent.type(screen.getByPlaceholderText(/amount/i), '-5')

    // submit the form directly, skipping the browser's own min="0" check
    fireEvent.submit(container.querySelector('form')!)

    expect(screen.getByText(/amount must be a positive number/i)).toBeInTheDocument()
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('calls onAdd with the correct data on valid submission', async () => {
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText(/title/i), 'Coffee')
    await userEvent.type(screen.getByPlaceholderText(/amount/i), '80')
    await userEvent.click(screen.getByRole('button', { name: /add expense/i }))

    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Coffee',
        amount: 80,
        category: 'Food',
      })
    )
  })

  it('resets the form fields after a successful submission', async () => {
    render(<ExpenseForm onAdd={() => {}} />)

    const titleInput = screen.getByPlaceholderText(/title/i)
    const amountInput = screen.getByPlaceholderText(/amount/i)

    await userEvent.type(titleInput, 'Coffee')
    await userEvent.type(amountInput, '80')
    await userEvent.click(screen.getByRole('button', { name: /add expense/i }))

    expect(titleInput).toHaveValue('')
    expect(amountInput).toHaveValue(null)
  })
})