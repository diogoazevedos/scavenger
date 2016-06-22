import test from 'ava'
import request from '../lib/request'

test('should get content with success', async t => {
  await request('https://github.com/diogoazevedos')
})

test('should get rendered content with success', async t => {
  await request('https://github.com/diogoazevedos', true)
})

test('should get content with failure', async t => {
  request('https://github.com/diogoazevedos/failure').catch(e => t.is(404, e.status))
})

test('should get rendered content with failure', async t => {
  request('https://github.com/diogoazevedos/failure', true).catch(e => t.is(404, e.status))
})
