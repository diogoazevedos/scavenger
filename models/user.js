const mongoose = require('mongoose')
    , Schema   = mongoose.Schema

const User = new Schema({
  name: String,
  token : String,
})

module.exports = mongoose.model('User', User)
