const mongoose = require('mongoose')

const schema = mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Service'
		}
	],
	icon: {
		data: Buffer,
		contentType: String,
	}

})

module.exports = mongoose.model('ServiceCategory', schema)