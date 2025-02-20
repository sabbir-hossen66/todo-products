"use client"

import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import AddTodoForm from "./AddTodoFrm"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch("/api/todos")
    const data = await response.json()
    setTodos(data)
  }

  const addTodo = async (text: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    const newTodo = await response.json()
    setTodos([...todos, newTodo])
  }

  const updateTodo = async (id: number, text: string, completed: boolean) => {
    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text, completed }),
    })
    const updatedTodo = await response.json()
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
  }

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <ul className="mt-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  )
}

