"use client"

import type { Todo } from "@/types/todo"
import { TodoItem } from "@/components/todo-item"

interface TodoSectionProps {
  title: string
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoSection({ title, todos, onToggle, onDelete }: TodoSectionProps) {
  if (todos.length === 0) return null

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground px-1">
        {title} ({todos.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
