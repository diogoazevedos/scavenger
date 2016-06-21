const x = require('x-ray')()
    , params  = require('./params')
    , { Map, fromJS } = require('immutable')

const run = (source, context, selector) => {
  if (typeof selector !== 'string') {
    selector = selector.map(build).toJS()
  }

  ({ source, context, selector } = params(source, context, selector))

  return x(source, context, selector)
}

const build = (value, key) => {
  if (typeof key === 'string' && value instanceof Map) {
    const { source, context, selector } = value

    return run(source, context, selector)
  }

  return value
}

const harvest = (source, context, selector) => {
  return run(source, context, fromJS(selector))
}

module.exports = harvest
