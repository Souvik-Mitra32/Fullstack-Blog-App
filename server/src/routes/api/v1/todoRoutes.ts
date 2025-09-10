import { Router } from "express"
import { getTodos } from "../../../controllers/todoController"

const router = Router()

router.get("/", getTodos)

export default router
