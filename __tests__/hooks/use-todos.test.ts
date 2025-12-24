import { renderHook, act } from '@testing-library/react'
import { useTodos } from '@/hooks/use-todos'

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('空のtodoで初期化される', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })

  it('新しいtodoを追加できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('テストタスク')
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('空のtodoは追加されない', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('   ')
    })

    expect(result.current.todos).toHaveLength(0)
  })

  it('todoの完了状態をトグルできる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(true)

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(false)
  })

  it('todoを削除できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク1')
      result.current.addTodo('テストタスク2')
    })

    expect(result.current.todos).toHaveLength(2)

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.deleteTodo(todoId)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('テストタスク2')
  })

  it('todosをlocalStorageに保存できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('永続化タスク')
    })

    const stored = localStorage.getItem('todos')
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].text).toBe('永続化タスク')
  })

  it('localStorageからtodosを読み込める', () => {
    const initialTodos = [
      { id: '1', text: '読み込まれたタスク', completed: false },
    ]
    localStorage.setItem('todos', JSON.stringify(initialTodos))

    const { result } = renderHook(() => useTodos())

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('読み込まれたタスク')
  })
})
