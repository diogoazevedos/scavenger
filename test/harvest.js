import test from 'ava'
import request from '../lib/request'
import harvest from '../lib/harvest'

let source, render

test.before(async t => {
  source = await request('https://github.com/diogoazevedos')
  render = await request('https://github.com/diogoazevedos', true)
})

test('should parse a simple selector', t => {
  const selector = { name: '.vcard-username' }
  const callback = (e, content) => t.is('diogoazevedos', content.name)

  harvest(source.data, undefined, selector)(callback)
  harvest(render.data, undefined, selector)(callback)
})

test('should parse a complex selector', t => {
  const selector = {
    name: '.vcard-username',
    repos: {
      context: '.source',
      selector: [{
        name: '.repo'
      }]
    }
  }

  const callback = (e, content) => {
    t.is('diogoazevedos', content.name)
    t.true(content.repos instanceof Array)
    t.true(content.repos[0] instanceof Object)
    t.true(content.repos[0].hasOwnProperty('name'))
  }

  harvest(source.data, undefined, selector)(callback)
  harvest(render.data, undefined, selector)(callback)
})
