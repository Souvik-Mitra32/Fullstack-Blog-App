import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db"
import appRoutes from "./routes"

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` })
}

const app = express()
const PORT = process.env.PORT || 3000
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || []

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", appRoutes)
;(async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})()
