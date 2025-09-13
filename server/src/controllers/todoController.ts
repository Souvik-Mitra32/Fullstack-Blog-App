import { Request, Response } from "express"
import { Todo } from "../models/todo"

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query

    const condition = userId ? { userId } : {}

    const todos = await Todo.find(condition).select("-_id")

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
      meta: {
        count: todos.length,
        page: 1,
        limit: todos.length / 1,
      },
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
      error: {
        code: "TODOS_NOT_FOUND",
        details: null,
      },
    })
  }
}
