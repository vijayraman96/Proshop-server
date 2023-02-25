import Jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

const protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = Jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next()
       } catch(err) {
            console.error(err)
            res.status(401)
            throw new Error('Not authorized, token failed')
       }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorised, no token')
    }
})

const admin = asyncHandler(async(req, res, next) => {
    if(req.user && req.user.IsAdmin) {
        console.log(req.user, 'req user')
        next()
    } else {
        res.status(401)
        throw new Error ('Not authorized as admin')
    }
})

export {protect, admin}