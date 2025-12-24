import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoList } from '@/components/todo-list'

describe('TodoList 統合テスト', () => {
  beforeEach(() => {
    localStorage.clear()
    cleanup()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('初期状態をレンダリングできる', () => {
    render(<TodoList />)

    expect(
      screen.getByPlaceholderText(/新しいタスクを入力/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/まだタスクがありません/i)).toBeInTheDocument()
  })

  it('新しいtodoを追加して表示できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)
    await user.type(input, '新しい統合タスク{Enter}')

    await waitFor(() => {
      expect(screen.getByText('新しい統合タスク')).toBeInTheDocument()
    })
  })

  it('todoを削除できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)
    await user.type(input, '削除するタスク{Enter}')

    await waitFor(() => {
      expect(screen.getByText('削除するタスク')).toBeInTheDocument()
    })

    const deleteButton = screen.getByRole('button', { name: /削除/i })
    await user.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('削除するタスク')).not.toBeInTheDocument()
    })
  })

  it('アクティブと完了済みのtodoを分けて表示できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/新しいタスクを入力/i)

    await user.type(input, 'タスク1{Enter}')
    await user.type(input, 'タスク2{Enter}')

    await waitFor(() => {
      expect(screen.getByText('タスク1')).toBeInTheDocument()
      expect(screen.getByText('タスク2')).toBeInTheDocument()
    })

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', { level: 2 })
      expect(
        headings.some((h) => h.textContent?.includes('アクティブなタスク'))
      ).toBe(true)
      expect(
        headings.some((h) => h.textContent?.includes('完了したタスク'))
      ).toBe(true)
    })
  })
})
