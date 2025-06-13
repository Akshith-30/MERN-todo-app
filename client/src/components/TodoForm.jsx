"use client"

import { useState } from "react"
import "./TodoForm.css"

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim()) {
      onAddTodo({
        text: text.trim(),
        description: description.trim()
      })
      setText("")
      setDescription("")
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
