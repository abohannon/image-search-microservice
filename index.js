const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

routes(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
