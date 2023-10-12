const mongoose = require('mongoose')

const schema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Service',
		}
	],
	paymentMethod: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PaymentMethod',
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	orderStatus: {
		type: String,
		enum: ['pending', 'processing', 'completed'],
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('Order', schema)