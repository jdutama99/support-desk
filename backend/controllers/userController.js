const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc Register new User
// @route /api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  ///validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // find if usee already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new error('invalid user data')
  }
})

// @desc Login User
// @route /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = { registerUser, loginUser }
