const test  = require('tape')
    , axios = require('axios')
    , harvest = require('../helpers/harvest')

test('should load url content', async (x) => {
  const { data: source } = await axios.get('https://github.com/diogoazevedos')

  x.equal(typeof source, 'string')

  test('should parse a simple selector', (t) => {
    const selector = { name: '.vcard-username' }

    harvest(source, undefined, selector)((error, content) => {
      t.equal(content.name, 'diogoazevedos')
      t.end()
    })
  })

  test('should parse a complex selector', (t) => {
    const selector = {
      name: '.vcard-username',
      repos: {
        context: '.source',
        selector: [{
          name: '.repo'
        }]
      }
    }

    harvest(source, undefined, selector)((error, content) => {
      t.equal(content.name, 'diogoazevedos')
      t.equal(typeof content.repos, 'object')
      t.end()
    })
  })

  x.end()
})
