import { Request, Response } from "express"
import { Comment } from "../models/comment"

export const getCommentsbyPostId = async (req: Request, res: Response) => {
  try {
    const { id: postId } = req.params

    const comments = await Comment.find({ postId }).select("-_id")

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
      meta: {
        count: comments.length,
        page: 1,
        limit: comments.length / 1,
      },
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
      error: {
        code: "COMMENTS_NOT_FOUND",
        details: null,
      },
    })
  }
}
