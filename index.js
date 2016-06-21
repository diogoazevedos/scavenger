const app  = require('express')()
    , http = require('http')
    , morgan = require('morgan')
    , parser = require('body-parser')

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(morgan('dev'))

app.use('/harvests', require('./controllers/harvests'))
app.use('/checks', require('./controllers/checks'))

http.createServer(app).listen(process.env.PORT || 1337)
