const routes = require('express').Router()
const URLController = require('../controllers/url.controller')

routes.post('/shortenURL', URLController.sendURL);

module.exports = routes;
