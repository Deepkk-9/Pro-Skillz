const bcrypt = require('bcrypt')
const serviceProviderRouter = require('express').Router()

const ServiceProvider = require('../../mongodb/model/serviceProvider')
const User = require('../../mongodb/model/user')
const Location = require('../../mongodb/model/location')

serviceProviderRouter.get('/', async (req, res) => {

	const serviceProviders = await ServiceProvider
								.find({})
								.populate('user', {
									firstame: 1,
									lastname: 1,
									email: 1,
									phone: 1,
									address: 1
								})

	res.json(serviceProviders)

})

serviceProviderRouter.post('/', async (req, res) => {

	const { firstname, lastname, phone, email, password, categories, coordinates } = req.body

	const userExists = await User.findOne({
									phone, 
									role: {
										$in: ['serviceProvider']
									}
								})

	if (userExists)
		return res
			.status(409)
			.json({
				error: "A user with this phone number already exists"
			})

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	
	const user = new User({
		firstname,
		lastname,
		phone,
		email,
		passwordHash,
		role: "serviceProvider"
	})
	
	const savedUser = await user.save()

	const serviceProvider = new ServiceProvider({
		user: savedUser._id,
		categories,
		allowed: false,
	})

	const savedServiceProvider = await serviceProvider.save()

	const location = new Location({
		user: savedUser._id,
		location: {
			type: 'Point',
			coordinates,
		}
	})

	const savedLocation = await location.save()

	res.status(201).json({
		savedUser, savedServiceProvider, savedLocation
	})

})


module.exports = serviceProviderRouter