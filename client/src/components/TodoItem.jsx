"use client"

import { useState } from "react"
import { useNotification } from "./Notifications"
import "./TodoItem.css"

function TodoItem({ todo, onToggle, onDelete, onUpdateText }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const [description, setDescription] = useState(todo.description || "")
  const { notifySuccess, notifyError } = useNotification()

  const handleSave = async () => {
    try {
      await onUpdateText(todo._id, text, description)
      setIsEditing(false)
      notifySuccess("Task updated successfully!")
    } catch (error) {
      console.error("Error updating todo:", error)
      notifyError("Failed to update task. Please try again.")
    }
  }

  const handleToggle = async () => {
    try {
      await onToggle(todo._id, !todo.completed)
      const status = !todo.completed ? "completed" : "marked as incomplete"
      notifySuccess(`Task ${status}!`)
    } catch (error) {
      console.error("Error toggling todo:", error)
      notifyError("Failed to update task status. Please try again.")
    }
  }

  const handleDelete = async () => {
    try {
      await onDelete(todo._id)
      notifySuccess("Task deleted successfully!")
    } catch (error) {
      console.error("Error deleting todo:", error)
      notifyError("Failed to delete task. Please try again.")
    }
  }

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />

        <div className="todo-text-content">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="todo-edit-input"
                placeholder="Task title"
                autoFocus
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="todo-edit-textarea"
                placeholder="Task description (optional)"
                rows="3"
              />
            </div>
          ) : (
            <>
              <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
                {todo.text}
              </span>
              {todo.description && (
                <p className={`todo-description ${todo.completed ? "completed" : ""}`}>
                  {todo.description}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="todo-button save-button">
              Save
            </button>
            <button
              onClick={() => {
                setText(todo.text)
                setDescription(todo.description || "")
                setIsEditing(false)
              }}
              className="todo-button cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="todo-button edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="todo-button delete-button">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
