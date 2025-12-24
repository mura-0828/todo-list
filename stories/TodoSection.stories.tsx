import type { Meta, StoryObj } from "@storybook/react"
import { TodoSection } from "@/components/todo-section"
import { fn } from "@storybook/test"
import type { Todo } from "@/types/todo"

const meta = {
  title: "Components/TodoSection",
  component: TodoSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TodoSection>

export default meta
type Story = StoryObj<typeof meta>

const sampleTodos: Todo[] = [
  {
    id: "1",
    text: "プロジェクトの企画書を作成する",
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: "2",
    text: "デザインレビューを実施する",
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: "3",
    text: "コードレビューを依頼する",
    completed: false,
    createdAt: Date.now() - 10800000,
  },
]

const completedTodos: Todo[] = [
  {
    id: "4",
    text: "ミーティングの議事録を共有する",
    completed: true,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "5",
    text: "テストケースを作成する",
    completed: true,
    createdAt: Date.now() - 172800000,
  },
]

export const アクティブなタスク: Story = {
  args: {
    title: "アクティブなタスク",
    todos: sampleTodos,
    emptyMessage: "タスクがありません",
  },
}

export const 完了したタスク: Story = {
  args: {
    title: "完了したタスク",
    todos: completedTodos,
    emptyMessage: "完了したタスクがありません",
  },
}

export const 空のリスト: Story = {
  args: {
    title: "アクティブなタスク",
    todos: [],
    emptyMessage: "タスクがありません",
  },
}

export const 多数のタスク: Story = {
  args: {
    title: "アクティブなタスク",
    todos: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      text: `タスク ${i + 1}`,
      completed: false,
      createdAt: Date.now() - i * 3600000,
    })),
    emptyMessage: "タスクがありません",
  },
}
