import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed: Boolean,
  userId: Number,
})

export const Todo = mongoose.model("Todo", todoSchema)
