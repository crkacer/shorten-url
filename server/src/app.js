const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

// Map global config
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/shortenURL', {
    useMongoClient: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err))

app.use(morgan('combined'))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT || 8081)