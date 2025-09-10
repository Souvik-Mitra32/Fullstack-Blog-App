import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export const database = mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
database.then(() => console.log("DB connected"));
//# sourceMappingURL=db.js.map