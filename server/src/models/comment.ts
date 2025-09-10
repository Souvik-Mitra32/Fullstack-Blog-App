import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  body: String,
  postId: Number,
})

export const Comment = mongoose.model("Comment", commentSchema)
