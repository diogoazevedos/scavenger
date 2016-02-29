const express   = require('express')
    , router    = express.Router()
    , auth      = require('../middlewares/auth')
    , get       = require('../helpers/request')
    , harvest   = require('../helpers/harvest')
    , Immutable = require('immutable')

router.use(auth)
router.post('/', async (request, response) => {
  const { render, source, context, selector } = request.body
  const blueprint = Immutable.fromJS(selector)

  let data, status;

  try {
    ({ data, status } = await get(source, render))
  } catch (e) {
    ({ data, status } = e)
  }

  harvest(data, context, blueprint)((error, content) => {
    response.status(status).json(content)
  })
})

module.exports = router
