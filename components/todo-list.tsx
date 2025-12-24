'use client'

import { useTodos } from '@/hooks/use-todos'
import { TodoInput } from '@/components/todo-input'
import { TodoSection } from '@/components/todo-section'
import { Card, CardContent } from '@/components/ui/card'

export function TodoList() {
  const {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos()

  return (
    <div className="space-y-6">
      <TodoInput onAdd={addTodo} />

      <div className="space-y-4">
        {todos.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                まだタスクがありません。上のフォームから追加してみましょう！
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <TodoSection
              title="アクティブなタスク"
              todos={activeTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
            <TodoSection
              title="完了したタスク"
              todos={completedTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </>
        )}
      </div>
    </div>
  )
}
