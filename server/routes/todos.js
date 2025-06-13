const express = require("express")
const Todo = require("../models/Todo")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all todos for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new todo
router.post("/", auth, async (req, res) => {
  try {
    const { text, description } = req.body

    if (!text) {
      return res.status(400).json({ message: "Text is required" })
    }

    const newTodo = new Todo({
      text,
      description: description || "",
      user: req.userId,
    })

    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a todo
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    const updates = {}

    // Only allow updating text, description and completed status
    if (req.body.text !== undefined) updates.text = req.body.text
    if (req.body.description !== undefined) updates.description = req.body.description
    if (req.body.completed !== undefined) updates.completed = req.body.completed

    // Find and update todo
    const todo = await Todo.findOneAndUpdate({ _id: id, user: req.userId }, updates, { new: true })

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    res.json(todo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId })

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    res.json({ message: "Todo deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
