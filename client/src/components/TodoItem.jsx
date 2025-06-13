"use client"

import { useState } from "react"
import "./TodoItem.css"

function TodoItem({ todo, onToggle, onDelete, onUpdateText }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const handleSave = async () => {
    try {
      await onUpdateText(todo._id, text)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="todo-checkbox"
        />

        <div className="todo-text-content">
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="todo-edit-input"
              autoFocus
            />
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
            <button onClick={() => onDelete(todo._id)} className="todo-button delete-button">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
