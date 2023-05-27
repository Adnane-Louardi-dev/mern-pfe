const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const AgentUser = require('../models/agentsmodel');

const protect = (role)=> { return asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await AgentUser.findById(decoded.id).select('-password')
      if(req.user.role == role) {
        next()
      }
      else{
        res.status(401)
        res.json({message:"u cant access this route"})
      }
      
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})}

module.exports = { protect }