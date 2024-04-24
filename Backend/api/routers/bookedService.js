const bookedServiceRouter = require('express').Router()

const BookedService = require('../../mongodb/model/bookedService')
const Service = require('../../mongodb/model/service')

// route to get all the current booked services
bookedServiceRouter.get('/', async (req, res) => {

	const bookedServices = await BookedService
		.find({})
		.populate('service')
	res.json(bookedServices)

})

// route to get all the booked services of a specific user through token
bookedServiceRouter.get('/user', async (req, res) => {

	user = req.user

	if (!user)
		return res
			.status(401)
			.json({
				error: "Invalid User!"
			})

	const bookedServices = await BookedService
		.find({ user: user.id })
	res.status(200).json(bookedServices)

})

// route to get all the booked services of a specific user through user id
bookedServiceRouter.get('/user/:id', async (req, res) => {

	const bookedServices = await BookedService
		.find({ user: req.params.id })
		.populate('service', {
			name: 1,
			image: 1
		})

	res.status(200).json(bookedServices)

})

// route to get specific booked service using booked service id
bookedServiceRouter.get('/service/:id', async (req, res) => {

	const bookedService = await BookedService.findById(req.params.id)

	if (bookedService)
		res.json(bookedService)
	else
		res.status(404).end()

})

// route to create a booked service object
bookedServiceRouter.post('/', async (req, res) => {

	user = req.user
	const { services, payment, deliveryDates, status } = req.body

	if (!user)
		return res
			.status(401)
			.json({
				error: "Invalid User!"
			})

	// fetching all the data objects of services in body
	const serviceObjects = await Service.find({
		_id: {
			$in: services
		}
	})

	const bookedServices = []

	// creating an object of each service 
	serviceObjects.forEach(service => {

		const bookedService = {
			user: user.id,
			service: service._id,
			payment,
			deliveryDates: deliveryDates.map(date => new Date(date)),
			serviceCharge: service.serviceCharge,
			status
		}

		bookedServices.push(bookedService)

	});

	// inserting all objects at once
	const savedBookedServices = await BookedService.insertMany(bookedServices);

	res
		.status(201)
		.json(savedBookedServices)

})

// route to update a booked service object with user token
bookedServiceRouter.put('/:id', async (req, res) => {

	user = req.user
	const { deliveryDates, status } = req.body

	if (!user)
		return res
			.status(401)
			.json({
				error: "Invalid User!"
			})

	const bookedService = await BookedService.findById(req.params.id)

	if (deliveryDates) bookedService.deliveryDates = deliveryDates.map(date => new Date(date))
	if (status) bookedService.status = status

	const updatedBookedService = await bookedService.save()
	res.status(200).json(updatedBookedService)

})

// route to delete a booked service object with user token
bookedServiceRouter.delete('/:id', async (req, res) => {

	const user = req.user

	if (!user)
		return res
			.status(401)
			.json({
				error: "Invalid User!"
			})

	await BookedService.findByIdAndDelete(req.params.id)
	res.status(204).end()

})

module.exports = bookedServiceRouter