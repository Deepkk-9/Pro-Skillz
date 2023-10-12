const mongoose = require('mongoose')

const schema = mongoose.Schema({

	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order',
		required: true
	},
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
	invoiceId: {
		type: String,
	},
	invoiceDate: {
		type: Date,
		required: true
	},
	invoiceAmount: {
		type: Number,
		required: true
	},
	paymentMethod: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PaymentMethod',
		required: true
	},
	paymentStatus: {
		type: String,
		enum: ['paid', 'pending']
	}

})

module.exports = mongoose.model('Invoice', schema)