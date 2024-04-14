const express = require('express')
const cors = require('cors')
const path = require('path')

const bodyParser = require('body-parser')

const middleware = require('../api/utils/middleware')

// routers
const testRouter = require('../api/routers/test')
const otpRouter = require('../api/routers/otp')
const loginRouter = require('../api/routers/login')
const serviceProviderRouter = require('../api/routers/serviceProvider')
const userRouter = require('../api/routers/user')
const adminRouter = require('../api/routers/admin')
const serviceRouter = require('../api/routers/service')
const serviceCategoryRouter = require('../api/routers/serviceCatergory')
const cartRouter = require('../api/routers/cart')
const reviewRouter = require('../api/routers/review')
const locationRouter = require('../api/routers/location')
const bookedService = require('../api/routers/bookedService')

const sampleImageRouter = require('../api/routers/sampleImage')

require('express-async-errors')

const app = express()

app.use(express.static('build'))

app.use(cors({
	origin: "*"
}))
app.use(express.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({
	limit: '5mb',
	extended: true,
}))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/test', testRouter)
app.use('/api/otp', otpRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/serviceProvider', serviceProviderRouter)
app.use('/api/service', serviceRouter)
app.use('/api/serviceCategory', serviceCategoryRouter)
app.use('/api/carts', cartRouter)
app.use('/api/review', reviewRouter)
app.use('/api/location', locationRouter)
app.use('/api/bookedService', bookedService)

app.use('/api/image', sampleImageRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app