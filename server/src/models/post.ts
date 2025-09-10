import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  body: String,
  userId: Number,
})

export const Post = mongoose.model("Post", postSchema)
