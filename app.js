const express   = require('express')
    , https     = require('https')
    , http      = require('http')
    , app       = express()
    , morgan    = require('morgan')
    , mongoose  = require('mongoose')
    , parser    = require('body-parser')
    , database  = require('./configs/database')
    , fs        = require('fs')
    , Immutable = require('immutable')

Immutable.Iterable.prototype[Symbol.for('get')] = function(value) { return this.get(value) }
mongoose.connect(`mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`)

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(morgan('dev'))

app.use('/parses', require('./controllers/parses'))

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

http.createServer(app).listen(3002)
https.createServer(options, app).listen(3003)
