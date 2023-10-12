const testRouter = require('express').Router()

var data = require('../db')

testRouter.get('/', async (req, res) => {
	res.json(data)
})

testRouter.get('/:id', async (req, res) => {
	const id = Number(req.params.id)
	const dat = data.find(dat => dat.id === id)
	res.json(dat)
})

testRouter.post('/', async(req, res) => {
	data = req.body
	res.status(201).json(data)
})

module.exports = testRouter