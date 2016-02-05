const express   = require('express')
    , router    = express.Router()
    , axios     = require('axios')
    , auth      = require('../middlewares/auth')
    , harvest   = require('../helpers/harvest')
    , Immutable = require('immutable')

router.use(auth)
router.post('/', async (request, response) => {
  const { source, context, selector } = request.body
  const { data, status } = await axios.get(source)

  const blueprint = Immutable.fromJS(selector)

  harvest(data, context, blueprint)((error, content) => {
    response.status(status).json(content)
  })
})

module.exports = router
