import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    createAt: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
