const { startStandaloneServer } = require('@apollo/server/standalone')

const app = require('./config/app')
const { API_PORT, GRAPHQL_PORT } = require('./config/config')

const apolloServer = require('./config/apolloServer')

const connectToMongoDB = require('./mongodb/index')

connectToMongoDB()

app.listen(API_PORT, () => {
	console.log(`API Server running on port ${API_PORT}`)
})

startStandaloneServer(apolloServer, {
	listen: {port: GRAPHQL_PORT}
}).then(({url}) => {
	console.log(`GraphQL Server running on port ${GRAPHQL_PORT}`)
})