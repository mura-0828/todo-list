"use client"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TodoItem } from "@/components/todo-item"
import type { Todo } from "@/types/todo"
import { jest } from "@jest/globals"

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "テストタスク",
    completed: false,
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnDelete.mockClear()
  })

  it("todoのテキストをレンダリングできる", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    expect(screen.getByText("テストタスク")).toBeInTheDocument()
  })

  it("チェックボックスをクリックするとonToggleが呼ばれる", async () => {
    const user = userEvent.setup()
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const checkbox = screen.getByRole("checkbox")
    await user.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledWith("1")
  })

  it("削除ボタンをクリックするとonDeleteが呼ばれる", async () => {
    const user = userEvent.setup()
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    await user.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith("1")
  })

  it("todoが完了済みの場合、完了スタイルが表示される", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true }
    render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()
  })
})
