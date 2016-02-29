const axios    = require('axios')
    , phantom  = require('./phantom')

module.exports = (source, render) => {
  if (render) {
    return phantom(source)
  }

  return axios.get(source)
}
