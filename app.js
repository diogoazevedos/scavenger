const express   = require('express')
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

http.createServer(app).listen(process.env.PORT || 1337)
