import { Router } from "express"
import { getCommentsbyPostId } from "../../../controllers/commentController"

const router = Router({ mergeParams: true })

router.get("/", getCommentsbyPostId)

export default router
