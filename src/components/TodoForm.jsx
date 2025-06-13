"use client"

import { useState } from "react"

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim()) {
      onAddTodo(text.trim())
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoForm
