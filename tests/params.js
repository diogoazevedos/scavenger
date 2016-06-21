const test = require('tape')
    , params = require('../helpers/params')

test('should keep the same structure', (t) => {
  const { source, context, selector } = params('source', 'context', 'selector')

  t.equal(source, 'source')
  t.equal(context, 'context')
  t.equal(selector, 'selector')

  t.end()
})

test('should move the selector to context', (t) => {
  const { source, context, selector } = params('source', undefined, 'selector')

  t.equal(source, 'source')
  t.equal(context, 'selector')
  t.equal(selector, undefined)

  t.end()
})

test('should move the context to source and the selector to context', (t) => {
  const { source, context, selector } = params(undefined, 'context', 'selector')

  t.equal(source, 'context')
  t.equal(context, 'selector')
  t.equal(selector, undefined)

  t.end()
})
