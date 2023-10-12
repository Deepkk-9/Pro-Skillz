const jwt = require('jsonwebtoken')

const User = require('../../mongodb/model/user')

const { JWT_SECRET } = require('../../config/config')

// middleware for logging requiests
const requestLogger = (req, res, next) => {
	console.log('Method: ', req.method)
	console.log('Path: ', req.path)
	console.log('Body: ', req.body)
	console.log('---------')
	next()
}

// middleware for unknown endpoints
const unknownEndpoint = (req, res) => {
	res.status(404).send({
		error: 'Unknown Endpoint'
	})
}

// middleware for error handling
const errorHandler = (error, req, res, next) => {

	console.error(error.message)

	if(error.name === 'ValidationError')
		return response.status(400).json({error: error.message})

	next(error)
}

// middleware for extracting token from request
const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	console.log(authorization)
	if (authorization && authorization.startsWith('Bearer '))
		req.token = authorization.replace('Bearer ', '')
	next()
}

// middleware for verifying token
const userExtractor = async (req, res, next) => {
	if(req.token){
		const decodedToken = jwt.verify(req.token, JWT_SECRET)
		req.user = await User.findById(decodedToken.id)
	}
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}