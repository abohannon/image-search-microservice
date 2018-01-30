const mongoose = require('mongoose')
const Schema = mongoose.Schema

const searchSchema = new Schema({
  query: String,
  date: Date,
})

mongoose.model('search', searchSchema)
