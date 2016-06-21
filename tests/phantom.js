const test  = require('tape')
    , axios = require('axios')
    , phantom = require('../helpers/phantom')
    , harvest = require('../helpers/harvest')

test('should get page content', async (t) => {
  const { data, status }               = await phantom('https://github.com/diogoazevedos')
  const { data: source, status: code } = await axios.get('https://github.com/diogoazevedos')

  t.equal(status, code)

  const selector = { name: '.vcard-username' }

  harvest(source, undefined, selector)((error, content) => {
    harvest(data, undefined, selector)((err, contnt) => {
      t.equal(content.name, contnt.name)
      t.end()
    })
  })
})
