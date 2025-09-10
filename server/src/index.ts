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

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true) // allow server-to-server or curl

      // allow if explicitly listed
      if (allowedOrigins.includes(origin)) return callback(null, true)

      // allow all Vercel preview deployments (*.vercel.app)
      if (/\.vercel\.app$/.test(origin)) return callback(null, true)

      // otherwise block
      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  })
)

app.use("/", appRoutes)
;(async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})()
