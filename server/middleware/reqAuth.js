const jwt = require('jsonwebtoken')
const Entreprise = require('../models/entreprisemodel')

const reqAuth = async (req, res, next) => {
  // verify entreprise is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'NO Authorization'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.code_jwt)

    req.user = await Entreprise.findOne({ _id }).select('_id')
    next() 

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = reqAuth