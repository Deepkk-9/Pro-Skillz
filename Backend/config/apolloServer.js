const { ApolloServer } = require('@apollo/server')
const { startStandAloneServer } = require('@apollo/server/standalone')

const {typeDefs, resolvers} = require('../graphql/schema')

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers
})

module.exports = apolloServer

