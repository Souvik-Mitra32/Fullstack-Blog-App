import { Request, Response } from "express"
import { Post } from "../models/post"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query

    const condition = userId ? { userId } : {}

    const posts = await Post.find(condition)

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
      meta: {
        count: posts.length,
        page: 1,
        limit: posts.length / 1,
      },
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
      error: {
        code: "POSTS_NOT_FOUND",
        details: null,
      },
    })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await Post.findOne({ id })
    // Need to validate whether the id is of a valid post or not
    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
      meta: {
        count: 1,
        page: 1,
        limit: 1,
      },
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
      error: {
        code: "POST_NOT_FOUND",
        details: null,
      },
    })
  }
}
