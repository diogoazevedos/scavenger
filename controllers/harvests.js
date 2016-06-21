const express = require('express')
    , router  = express.Router()
    , get = require('../helpers/request')
    , harvest = require('../helpers/harvest')

router.post('/', async (request, response) => {
  const { render, source, context, selector } = request.body

  let data, status;

  try {
    ({ data, status } = await get(source, render))
  } catch (e) {
    ({ data, status } = e)
  }

  harvest(data, context, selector)((error, content) => {
    response.status(status).json(content)
  })
})

module.exports = router
