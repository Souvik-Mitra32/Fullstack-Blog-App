import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
  },
  geo: {
    lat: String,
    lng: String,
  },
})

export const User = mongoose.model("User", userSchema)
