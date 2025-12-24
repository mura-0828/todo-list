import { TodoList } from "@/components/todo-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">TODOリスト</h1>
          <p className="text-muted-foreground">タスクを管理して、生産性を向上させましょう</p>
        </div>
        <TodoList />
      </div>
    </main>
  )
}
