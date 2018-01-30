const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
require('./models/Search')
const keys = require('./config/keys')

mongoose.Promise = global.Promise
mongoose.connect(keys.MONGO_URI)

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

const routes = require('./routes')
routes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
