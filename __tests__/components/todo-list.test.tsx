import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TodoList } from "@/components/todo-list"

describe("TodoList 統合テスト", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("初期状態をレンダリングできる", () => {
    render(<TodoList />)

    expect(screen.getByText(/todo list/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
  })

  it("新しいtodoを追加して表示できる", async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    await user.type(input, "新しい統合タスク{Enter}")

    expect(screen.getByText("新しい統合タスク")).toBeInTheDocument()
  })

  it("todoの完了状態をトグルできる", async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    await user.type(input, "完了するタスク{Enter}")

    const checkbox = screen.getByRole("checkbox")
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(screen.getByText(/completed/i)).toBeInTheDocument()
  })

  it("todoを削除できる", async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    await user.type(input, "削除するタスク{Enter}")

    expect(screen.getByText("削除するタスク")).toBeInTheDocument()

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    await user.click(deleteButton)

    expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument()
  })

  it("アクティブと完了済みのtodoを分けて表示できる", async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByPlaceholderText(/add a new task/i)

    await user.type(input, "アクティブなタスク{Enter}")
    await user.type(input, "完了するタスク{Enter}")

    const checkboxes = screen.getAllByRole("checkbox")
    await user.click(checkboxes[1])

    expect(screen.getByText(/active/i)).toBeInTheDocument()
    expect(screen.getByText(/completed/i)).toBeInTheDocument()
  })
})
