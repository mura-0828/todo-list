import type { Meta, StoryObj } from '@storybook/react'
import { TodoItem } from '@/components/todo-item'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    todo: { control: 'object' },
  },
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const アクティブなタスク: Story = {
  args: {
    todo: {
      id: '1',
      text: 'プロジェクトの企画書を作成する',
      completed: false,
      createdAt: new Date(),
    },
  },
}

export const 完了したタスク: Story = {
  args: {
    todo: {
      id: '2',
      text: 'ミーティングの議事録を共有する',
      completed: true,
      createdAt: new Date(),
    },
  },
}

export const 長いテキストのタスク: Story = {
  args: {
    todo: {
      id: '3',
      text: 'これは非常に長いタスクのテキストで、複数行にわたって表示される可能性があります。UIが適切に処理できるかをテストするためのサンプルテキストです。',
      completed: false,
      createdAt: new Date(),
    },
  },
}
