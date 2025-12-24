'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface TodoInputProps {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    onAdd(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex gap-2">
          <Input
            placeholder="新しいタスクを入力..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleAdd} size="icon" className="shrink-0">
            <Plus className="h-5 w-5" />
            <span className="sr-only">タスクを追加</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
