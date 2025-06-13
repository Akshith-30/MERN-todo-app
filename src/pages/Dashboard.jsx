"use client"

import { useState, useEffect, useContext } from "react"
import { supabase } from "../lib/supabaseClient"
import { AuthContext } from "../App"
import TodoItem from "../components/TodoItem"
import TodoForm from "../components/TodoForm"

function Dashboard() {
  const { user } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [user])

  const fetchTodos = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setTodos(data || [])
    } catch (error) {
      setError("Error fetching todos")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (text) => {
    try {
      const newTodo = {
        user_id: user.id,
        text,
        completed: false,
      }

      const { data, error } = await supabase.from("todos").insert([newTodo]).select()

      if (error) throw error

      setTodos([data[0], ...todos])
    } catch (error) {
      setError("Error adding todo")
      console.error(error)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const { error } = await supabase.from("todos").update({ completed }).eq("id", id)

      if (error) throw error

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
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

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id)

      if (error) throw error

      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      setError("Error deleting todo")
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Error logging out:", error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="flex items-center justify-between max-w-4xl px-4 py-4 mx-auto">
          <h1 className="text-2xl font-bold">Todo Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl px-4 py-8 mx-auto">
        <TodoForm onAddTodo={addTodo} />

        {error && <div className="p-3 my-4 text-sm text-red-600 bg-red-100 rounded-md">{error}</div>}

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Todos</h2>

          {loading ? (
            <div className="flex items-center justify-center h-32">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="p-4 mt-4 text-center bg-white rounded-md shadow">No todos yet. Add one above!</div>
          ) : (
            <ul className="mt-4 space-y-2">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
