const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(morgan('combined'))
app.use(body_parser.json())
app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT || 8081)