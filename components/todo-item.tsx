"use client"

import type { Todo } from "@/types/todo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Card className={cn("shadow-sm transition-all hover:shadow-md", todo.completed && "bg-muted/50")}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} className="shrink-0 mt-0.5" />
            <span
              className={cn(
                "flex-1 text-foreground transition-all break-words",
                todo.completed && "line-through text-muted-foreground",
              )}
            >
              {todo.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="self-end text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
