import { NextResponse } from "next/server"

// This is a simple in-memory store. In a real application, you'd use a database.
const todos: { id: number; text: string; completed: boolean }[] = []

export async function GET() {
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { text } = await request.json()
  const newTodo = { id: Date.now(), text, completed: false }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(request: Request) {
  const { id, text, completed } = await request.json()
  const index = todos.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    todos[index] = { ...todos[index], text, completed }
    return NextResponse.json(todos[index])
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const index = todos.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0]
    return NextResponse.json(deletedTodo)
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 })
}

