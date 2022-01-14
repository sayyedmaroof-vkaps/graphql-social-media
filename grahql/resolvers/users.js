import bcrypt from 'bcryptjs'
import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validators.js'

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

export default {
  Mutation: {
    async login(parent, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) throw new UserInputError('Errors', { errors })

      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Invalid username or password'
        throw new UserInputError('Invalid username or password', { errors })
      }
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },

    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //   validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // make sure user isn't already exists
      const userExists = await User.findOne({ username })

      if (userExists)
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is already been taken!',
          },
        })

      // Hashing password and generate auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })
      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
