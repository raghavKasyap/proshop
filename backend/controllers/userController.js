import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateAuthToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateAuthToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @desc    Register a user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateAuthToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid')
    }
})

// @desc    get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send(req.user)
})

export { authUser, getUserProfile, registerUser }
