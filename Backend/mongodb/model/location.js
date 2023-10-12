const mongoose = require('mongoose')

const schema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	locationName: {
		type: String
	}

})

// creates a geospatial index to enable geospatial queries
schema.index({ location: '2dsphere' })

module.exports = mongoose.model('Location', schema)