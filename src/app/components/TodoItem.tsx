"use client"

import { useState } from "react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: number, text: string, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const handleUpdate = () => {
    onUpdate(todo.id, text, todo.completed)
    setIsEditing(false)
  }

  const handleToggle = () => {
    onUpdate(todo.id, todo.text, !todo.completed)
  }

  return (
    <li className="flex items-center gap-2 mb-2">
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} className="h-5 w-5" />
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleUpdate}
          className="flex-grow p-2 border rounded"
        />
      ) : (
        <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)} className="px-2 py-1 bg-yellow-500 text-white rounded">
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={() => onDelete(todo.id)} className="px-2 py-1 bg-red-500 text-white rounded">
        Delete
      </button>
    </li>
  )
}

