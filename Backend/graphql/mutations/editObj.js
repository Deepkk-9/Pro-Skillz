const data = require('../db')

const typeDefs = `
type Mutation {
	editObj(
		id: Int!
		name: String!
	): Test
}
`

const resolvers = {
	Mutation: {
		editObj: (root, args) => {
			const obj = data.find(obj => obj.id === args.id)
			newObj = {
				...obj,
				name: args.name,
			}
			console.log(newObj)
			data.map(obj => obj.id === args.id? newObj : obj)
			return newObj
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}