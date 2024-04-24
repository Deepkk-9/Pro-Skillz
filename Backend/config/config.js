require('dotenv').config()

const API_PORT = process.env.API_PORT
const GRAPHQL_PORT = process.env.GRAPHQL_PORT

const MONGODB_URI = process.env.MONGODB_URI

const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_VERIFY_SID = process.env.TWILIO_VERIFY_SID

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
	API_PORT,
	GRAPHQL_PORT,
	MONGODB_URI,
	TWILIO_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_VERIFY_SID,
	JWT_SECRET
}