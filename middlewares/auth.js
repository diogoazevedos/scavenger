const passport = require('passport')
    , Strategy = require('passport-http-bearer').Strategy
    , User     = require('../models/user')

passport.use(new Strategy((token, done) => {
  User.findOne({ token: token }, (error, user) => {
    if (error) return done(error)
    if (! user) return done(null, false)
    return done(null, user)
  })
}))

module.exports = passport.authenticate('bearer', { session: false })
