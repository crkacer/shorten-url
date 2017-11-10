const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(body_parser.json())
app.use(cors())

app.post('/shortenURL', (req, res) => {
    res.send({
        message: `URL ${req.body.url} is received`
    })
})

app.listen(process.env.PORT || 8081)