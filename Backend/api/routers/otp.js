const otpRouter = require('express').Router()
const twilio = require('twilio')

const User = require('../../mongodb/model/user')
const Cart = require('../../mongodb/model/cart')

const { TWILIO_AUTH_TOKEN, TWILIO_SID } = require('../../config/config') 
const { update } = require('lodash')

const generateOtp = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

const verifyOtp = (userOtp, otp) => userOtp === otp


otpRouter.post('/generate', async (req, res) => {

	const { phone } = req.body

	const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN)

	const otp = generateOtp()

	const response = await client
		.messages
		.create({
			body: `Your OTP is ${otp}`, 
			// from: '+14155240612', 
			from: '+13202887666', 
			to: phone
		})

		const userExists = await User.findOne({
											phone,
											role: {
												$in: ['user']
											}
										})

		if (userExists) {

			userExists.otp = otp;
			const updatedUser = await userExists.save()
			// res.status(200).json(updatedUser)
			res.status(200)
		
		} else {

			const user = new User({
				phone,
				otp,
				role: 'user',
			})
	
			const savedUser = await user.save()

			const cart = new Cart({
				user: savedUser._id,
				services: [],
				totalPrice: 0
			})

			const savedCart = await cart.save()

			console.log(savedUser, savedCart)
			res.status(201).json(savedUser)

		}

})  

otpRouter.post('/verify', async (req, res) => {

	const { phone, userOtp } = req.body

	const user = await User.findOne({ phone })

	if (verifyOtp(userOtp, user.otp)) {
		res.status(200).end()
	} else {
		res.status(401).json({
			error: 'OTP validation failed'
		})
	}

})

module.exports = otpRouter