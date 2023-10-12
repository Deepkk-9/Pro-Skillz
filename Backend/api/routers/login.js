const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../../mongodb/model/user')

const { JWT_SECRET } = require('../../config/config')

const verifyOtp = (userOtp, otp) => userOtp === otp

// to create jwt token for user login
loginRouter.post('/user', async (req, res) => {

	const { phone, userOtp } = req.body

	const user = await User.findOne({
									phone, 
									role: {
										$in: ['user']
									}
								})
	console.log(user)

	if (!(user && verifyOtp(userOtp, user.otp))) 
		return res.status(401).json({
			error: 'Invalid OTP'
		})

	const userForToken = {
		phone,
		id: user._id
	}

	const token = jwt.sign(userForToken, JWT_SECRET, {expiresIn: '365d'})

	res
		.status(200)
		.send({
			token,
			phone: phone
		})

})

loginRouter.post('/serviceProvider', async (req, res) => {

	const { phone, password } = req.body

	const user = await User.findOne({
									phone, 
									role: {
										$in: ['serviceProvider']
									}
								})

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect))
		return res.status(401).json({
			error: 'Invalid phone number of password'
		})

	const userForToken = {
		phone,
		id: user._id
	}

	const token = jwt.sign(userForToken, JWT_SECRET, {expiresIn: '365d'})

	res
		.status(200)
		.send({
			token,
			phone: phone
		})

})

loginRouter.post('/verifyUser', async (req, res) => {

	const user = req.user

	if(!user) 
		return res
			.status(401)
			.json({
				error: 'Invalid User!'
			})

	res
		.status(200)
		.json({
			status: 'verified',
			user
		})
	
})

module.exports = loginRouter