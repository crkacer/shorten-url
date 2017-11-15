const routes = require('express').Router()
const URLController = require('../controllers/url.controller')

routes.post('/shortenURL', URLController.sendURL);
routes.get('/:shortURL', URLController.returnLongURL);

module.exports = routes;
