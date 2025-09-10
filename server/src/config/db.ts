import dotenv from "dotenv"
import mongoose, { Error } from "mongoose"

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` })
}

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE_CONNECTION_STRING)
      throw new Error("DATABASE_CONNECTION_STRING is required")
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
    console.log("DB connected")
  } catch (err: any) {
    console.error("Error connecting DB:", err.message)
    process.exit(1)
  }
}
