const express   = require('express')
    , router    = express.Router()
    , axios     = require('axios')
    , auth      = require('../middlewares/auth')
    , harvest   = require('../helpers/harvest')
    , phantom   = require('../helpers/phantom')
    , Immutable = require('immutable')

router.use(auth)
router.post('/', async (request, response) => {
  const { render, source, context, selector } = request.body
  const blueprint = Immutable.fromJS(selector)

  let data, status;

  if (render) {
    ({ data, status } = await phantom(source))
  } else {
    ({ data, status } = await axios.get(source))
  }

  harvest(data, context, blueprint)((error, content) => {
    response.status(status).json(content)
  })
})

module.exports = router
