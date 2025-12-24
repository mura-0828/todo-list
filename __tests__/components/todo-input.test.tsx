import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TodoInput } from "@/components/todo-input"
import jest from "jest"

describe("TodoInput", () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  it("入力フィールドをレンダリングできる", () => {
    render(<TodoInput onAdd={mockOnAdd} />)

    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
  })

  it("Enterキーを押すとonAddが呼ばれる", async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    await user.type(input, "新しいタスク{Enter}")

    expect(mockOnAdd).toHaveBeenCalledWith("新しいタスク")
  })

  it("タスク追加後に入力フィールドがクリアされる", async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i) as HTMLInputElement
    await user.type(input, "新しいタスク{Enter}")

    expect(input.value).toBe("")
  })

  it("空の入力ではonAddが呼ばれない", async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    await user.type(input, "{Enter}")

    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it("IME入力中はタスクが追加されない", async () => {
    const user = userEvent.setup()
    render(<TodoInput onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i)

    // IME入力をシミュレート
    await user.type(input, "テスト")

    // 入力確定中のEnterキーをシミュレート
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
    })
    Object.defineProperty(event, "nativeEvent", {
      value: { isComposing: true },
    })
    input.dispatchEvent(event)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })
})
