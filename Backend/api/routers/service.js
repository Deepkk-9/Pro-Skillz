const serviceRouter = require('express').Router()

const User = require('../../mongodb/model/user')
const ServiceProvider = require('../../mongodb/model/serviceProvider')
const Service = require('../../mongodb/model/service')

serviceRouter.get('/', async (req, res) => {

	const services = await Service
							.find({})
							.populate({
								path: 'provider'
							})

	res.json(services)

})

serviceRouter.post('/', async (req, res) => {

	const user = req.user
	console.log(user)

	const { name, description, serviceCharge } = req.body
	console.log(name, description, serviceCharge)

	if (!user)
		return res
				.status(401)
				.json({
					error: 'Invalid User!'
				})
	
	const serviceProvider = await ServiceProvider.findOne({ user: user.id })

	if (!serviceProvider)
		return res
				.status(401)
				.json({
					error: 'Service Provdier not found!'
				})
	
	const service = new Service({
		provider: serviceProvider._id,
		name,
		description,
		serviceCharge
	})

	const savedService = await service.save()

	res
		.status(201)
		.json(savedService)

})

module.exports = serviceRouter