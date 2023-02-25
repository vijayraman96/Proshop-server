import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && await user.matchPassword(password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            IsAdmin: user.IsAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error('User already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            IsAdmin: user.IsAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User registartion failed')
    }
})
const getUserProfile = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.json(user)
    } catch (error) {
        
        res.status(404)
        throw new Error('User not found')
    }

})
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.IsAdmin = user.IsAdmin
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      IsAdmin: updatedUser.IsAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)

})
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})
const getUserById = asyncHandler(async(req, res) => {
    console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.IsAdmin = req.body.IsAdmin || user.IsAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      IsAdmin: updatedUser.IsAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}