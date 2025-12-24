import type { Meta, StoryObj } from "@storybook/react"
import { TodoInput } from "@/components/todo-input"
import { fn } from "@storybook/test"

const meta = {
  title: "Components/TodoInput",
  component: TodoInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onAdd: fn(),
  },
} satisfies Meta<typeof TodoInput>

export default meta
type Story = StoryObj<typeof meta>

export const デフォルト: Story = {}

export const 入力中: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector("input")
    if (input) {
      input.value = "新しいタスク"
      input.dispatchEvent(new Event("input", { bubbles: true }))
    }
  },
}
