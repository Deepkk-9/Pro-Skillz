const { mountpath } = require('../../config/app')
const data = require('../db')

const typeDefs = `
	type Query {
		objCount: Int!
	}
`

const resolvers = {
	Query: {
		objCount: async () => {
			return data.length
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}