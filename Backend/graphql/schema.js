const { merge } = require('lodash')

// types
const test = require('../graphql/types/test')

// queries
const allObj = require('../graphql/queries/allObj')
const objCount = require('../graphql/queries/objCount')

// mutations
const editObj = require('../graphql/mutations/editObj')
const { all } = require('../config/app')

const typeDefs = [
	test.typeDefs,
	objCount.typeDefs,
	allObj.typeDefs,
	editObj.typeDefs
]

const resolvers = merge(
	test.resolvers,
	objCount.resolvers,
	allObj.resolvers,
	editObj.resolvers
)

module.exports = {
	typeDefs,
	resolvers
}