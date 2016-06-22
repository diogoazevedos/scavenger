import test from 'ava'
import params from '../lib/params'

test('should keep the same structure', t => {
  const { source, context, selector } = params('source', 'context', 'selector')

  t.is(source, 'source')
  t.is(context, 'context')
  t.is(selector, 'selector')
})

test('should move the selector to context', t => {
  const { source, context, selector } = params('source', undefined, 'selector')

  t.is(source, 'source')
  t.is(context, 'selector')
  t.is(selector, undefined)
})

test('should move the context to source and the selector to context', t => {
  const { source, context, selector } = params(undefined, 'context', 'selector')

  t.is(source, 'context')
  t.is(context, 'selector')
  t.is(selector, undefined)
})
