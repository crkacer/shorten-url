const routes = require('express').Router()
const url = require('./url.routes')

routes.use('/url', url)

module.exports = routes;