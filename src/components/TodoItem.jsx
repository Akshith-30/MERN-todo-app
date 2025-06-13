"use client"

import { useState } from "react"

function TodoItem({ todo, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const handleSave = async () => {
    try {
      await onToggle(todo.id, todo.completed, text)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  return (
    <li className="p-4 bg-white rounded-md shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, !todo.completed)}
            className="w-5 h-5 mr-3 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
          />

          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
          )}
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setText(todo.text)
                  setIsEditing(false)
                }}
                className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default TodoItem
