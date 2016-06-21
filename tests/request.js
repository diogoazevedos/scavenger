const test = require('tape')
    , request = require('../helpers/request')

test('should get content with success', async (t) => {
  const { data, status } = await request('https://github.com/diogoazevedos')

  t.equal(status, 200)
  t.end()
})

test('should get rendered content with success', async (t) => {
  const { data, status } = await request('https://github.com/diogoazevedos', true)

  t.equal(status, 200)
  t.end()
})

test('should get content with failure', async (t) => {
  try {
    const { data, status } = await request('https://github.com/diogoazevedos/failure')
  } catch (e) {
    t.equal(e.status, 404)
    t.end()
  }
})

test('should get rendered content with failure', async (t) => {
  try {
    const { data, status } = await request('https://github.com/diogoazevedos/chococino', true)
  } catch (e) {
    t.equal(e.status, 404)
    t.end()
  }
})
