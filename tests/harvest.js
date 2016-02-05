const test      = require('tape-expect')
    , axios     = require('axios')
    , harvest   = require('../helpers/harvest')
    , Immutable = require('immutable')
    , expect    = require('chai').expect

Immutable.Iterable.prototype[Symbol.for('get')] = function(value) { return this.get(value) }

test('should load url content', async (x) => {
  const { data: source } = await axios.get('https://github.com/diogoazevedos')

  x.equal(typeof source, 'string')

  test('should parse a simple selector', (t) => {
    const selector = Immutable.fromJS({ name: '.vcard-username' })

    harvest(source, undefined, selector)((error, content) => {
      t.equal(content.name, 'diogoazevedos')
      t.end()
    })
  })

  test('should parse a complex selector', (t) => {
    const selector = Immutable.fromJS({
      name: '.vcard-username',
      repos: {
        context: '.source',
        selector: [{
          name: '.repo'
        }]
      }
    })

    harvest(source, undefined, selector)((error, content) => {
      t.equal(content.name, 'diogoazevedos')
      t.equal(typeof content.repos, 'object')
      t.end()
    })
  })

  x.end()
})
