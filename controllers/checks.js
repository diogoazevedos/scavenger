const express = require('express')
    , router  = express.Router()

router.get('/', (request, response) => response.send())

module.exports = router
