'use client'

import { useState, useCallback } from 'react'
import type { Todo } from '@/types/todo'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    }

    setTodos((prev) => [newTodo, ...prev])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
