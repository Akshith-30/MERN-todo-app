"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../App"
import TodoItem from "../components/TodoItem"
import TodoForm from "../components/TodoForm"
import "./Dashboard.css"

function Dashboard() {
  const { user, setUser } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:5000/api/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch todos")
      }

      const data = await response.json()
      setTodos(data)
    } catch (error) {
      setError("Error fetching todos")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (todoData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: typeof todoData === 'string' ? todoData : todoData.text,
          description: typeof todoData === 'object' ? todoData.description || '' : ''
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add todo")
      }

      const newTodo = await response.json()
      setTodos([newTodo, ...todos])
    } catch (error) {
      setError("Error adding todo")
      console.error(error)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      })

      if (!response.ok) {
        throw new Error("Failed to update todo")
      }

      setTodos(
        todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, completed }
          }
          return todo
        }),
      )
    } catch (error) {
      setError("Error updating todo")
      console.error(error)
    }
  }

  const updateTodoText = async (id, text, description) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, description }),
      })

      if (!response.ok) {
        throw new Error("Failed to update todo")
      }

      setTodos(
        todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, text, description }
          }
          return todo
        }),
      )
    } catch (error) {
      setError("Error updating todo")
      console.error(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete todo")
      }

      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      setError("Error deleting todo")
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed
    if (filter === "incomplete") return !todo.completed
    return true
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container header-content">
          <div className="header-left">
            <h1>Todo Dashboard</h1>
            {user && (
              <p className="welcome-message">
                Welcome back, {user.username || user.name || user.email}!
              </p>
            )}
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main container">
        {error && <div className="dashboard-error">{error}</div>}

        <div className="task-card">
          <h2 className="card-title">Add New Task</h2>
          <TodoForm onAddTodo={addTodo} />
        </div>

        <div className="task-card">
          <div className="tasks-header">
            <h2 className="card-title">Tasks</h2>
            <div className="filter-buttons">
              <button
                className={`filter-button ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-button ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`filter-button ${filter === "incomplete" ? "active" : ""}`}
                onClick={() => setFilter("incomplete")}
              >
                Incomplete
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-todos">Loading todos...</div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-todos">No tasks found.</div>
          ) : (
            <ul className="todos-list">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdateText={updateTodoText}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
