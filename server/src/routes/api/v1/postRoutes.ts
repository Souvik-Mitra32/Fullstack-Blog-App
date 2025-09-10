import { Router } from "express"
import { getPosts, getPostById } from "../../../controllers/postController"
import commentRoutes from "./commentRoutes"

const router = Router()

router.get("/", getPosts)
router.get("/:id", getPostById)
router.use("/:id/comments", commentRoutes)

export default router
