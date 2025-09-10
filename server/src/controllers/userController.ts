import { Request, Response } from "express"
import { User } from "../models/user"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      meta: {
        count: users.length,
        page: 1,
        limit: users.length / 1,
      },
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
      error: {
        code: "USERS_NOT_FOUND",
        details: null,
      },
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findOne({ id })
    // Need to validate whether the id is of a valid user or not
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
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
        code: "USER_NOT_FOUND",
        details: null,
      },
    })
  }
}
