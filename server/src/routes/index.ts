import { NextFunction, Request, Response, Router } from "express"
import apiRoutes from "./api"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the blog API")
})

router.use("/api", apiRoutes)

export default router
