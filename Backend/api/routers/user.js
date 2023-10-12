const userRouter = require('express').Router()

const User = require('../../mongodb/model/user')

userRouter.get('/', async (req, res) => {

	const users = await User.find({})
	res.json(users)

})

userRouter.get('/:id', async (req, res) => {

	const user = await User.findById(req.params.id)
	if(user)
		res.json(user)
	else
		res.status(400).end()

})

userRouter.delete('/:id', async (req, res) => {

	await User.findByIdAndDelete(req.params.id)
	res.status(204).end()

})

userRouter.put('/:id', async (req, res) => {

	const { firstname, lastname, email, address } = req.body

	const user = await User.findById(req.params.id)

	console.log('id: ', req.params.id)
	console.log('user: ', user)

	if (!user) 
		return res
				.status(404)
				.json({
					error: "User not found!"
				})

	if (firstname) user.firstname = firstname;
	if (lastname) user.lastname = lastname;
	if (email) user.email = email;
	if (address) user.address = address;

	const updatedUser = await user.save()
	res.json(updatedUser)
})

module.exports = userRouter