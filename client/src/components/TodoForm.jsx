"use client"

import { useState } from "react"
import { useNotification } from "./Notifications"
import "./TodoForm.css"

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const { notifySuccess, notifyError } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text.trim()) {
      try {
        await onAddTodo({
          text: text.trim(),
          description: description.trim()
        })
        setText("")
        setDescription("")
        notifySuccess("Task added successfully!")
      } catch (error) {
        console.error("Error adding task:", error)
        notifyError("Failed to add task. Please try again.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="todo-text">Task</label>
        <input
          type="text"
          id="todo-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your task..."
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="todo-description">Description</label>
        <textarea
          id="todo-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)..."
          className="form-textarea"
          rows="3"
        />
      </div>
      <button type="submit" disabled={!text.trim()} className="add-task-button">
        + Add Task
      </button>
    </form>
  )
}

export default TodoForm
