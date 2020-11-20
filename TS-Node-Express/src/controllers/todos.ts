import { Todo } from './../models/todos'
import { RequestHandler } from 'express'
import { text } from 'body-parser'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text
  const newTodo: Todo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({ message: 'New Todo created', createdTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id
  const updatedText = (req.body as { text: string }).text
  const todoIndex = TODOS.findIndex(todo => todo.id == todoId)

  if (todoIndex < 0) {
    throw new Error('could not find todo')
  } else {
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)
  }

  res.status(200).json({ message: 'Updated!!', updatedTodos: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id
  const todoIndex = TODOS.findIndex(todo => todo.id == todoId)

  if (todoIndex < 0) {
    throw new Error('could not find todo')
  } else {
    TODOS.splice(todoIndex, 1)
  }

  res.status(200).json({ message: 'Deleted successfully!!' })
}
