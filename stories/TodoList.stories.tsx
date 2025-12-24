import type { Meta, StoryObj } from '@storybook/react'
import { TodoList } from '@/components/todo-list'

const meta = {
  title: 'Components/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TodoList>

export default meta
type Story = StoryObj<typeof meta>

export const デフォルト: Story = {}

export const 初期状態: Story = {
  play: async ({ canvasElement }) => {
    // LocalStorageをクリアして初期状態を表示
    localStorage.removeItem('todos')
    window.location.reload()
  },
}
