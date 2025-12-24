import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoInput } from '@/components/todo-input'
import { jest } from '@jest/globals'

describe('TodoInput', () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  it('入力フィールドをレンダリングできる', () => {
    render(<TodoInput onAdd={mockOnAdd} />)

    expect(
      screen.getByPlaceholderText(/新しいタスクを入力/i)
    ).toBeInTheDocument()
  })

  it('Enterキーを押すとonAddが呼ばれる', async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)
    await user.type(input, '新しいタスク{Enter}')

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('新しいタスク')
    })
  })

  it('タスク追加後に入力フィールドがクリアされる', async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(
      /新しいタスクを入力/i
    ) as HTMLInputElement
    await user.type(input, '新しいタスク{Enter}')

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('空の入力ではonAddが呼ばれない', async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)
    await user.type(input, '{Enter}')

    await waitFor(() => {
      expect(mockOnAdd).not.toHaveBeenCalled()
    })
  })

  it('IME入力中はタスクが追加されない', async () => {
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    })
    // isComposingプロパティを設定
    Object.defineProperty(event, 'isComposing', {
      value: true,
      writable: false,
    })
    input.dispatchEvent(event)

    await waitFor(() => {
      expect(mockOnAdd).not.toHaveBeenCalled()
    })
  })
})
