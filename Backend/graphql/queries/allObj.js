const data = require('../db')

const typeDefs = `
type Query {
	allObj: [Test!]!
}
`

const resolvers = {
	Query: {
		allObj: (root, args) => {
			return data
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}