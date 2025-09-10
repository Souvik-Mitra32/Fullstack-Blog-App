import { Router } from "express"
import postRoutes from "./postRoutes"
import userRoutes from "./userRoutes"
import todoRoutes from "./todoRoutes"

const router = Router()

router.use("/posts", postRoutes)
router.use("/users", userRoutes)
router.use("/todos", todoRoutes)

export default router
