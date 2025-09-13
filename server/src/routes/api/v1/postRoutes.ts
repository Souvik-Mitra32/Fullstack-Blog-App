import { Router } from "express"
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
} from "../../../controllers/postController"
import commentRoutes from "./commentRoutes"

const router = Router()

router.get("/", getPosts)
router.post("/", createPost)
router.get("/:id", getPostById)
router.put("/:id", updatePost)
router.use("/:id/comments", commentRoutes)

export default router
