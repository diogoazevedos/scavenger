const x         = require('x-ray')()
    , params    = require('./params')
    , Immutable = require('immutable')

const build = (value, key) => {
  if (buildable(value, key)) {
    const { source, context, selector } = value
    return harvest(source, context, selector)
  }

  return value
}

const harvest = (source, context, selector) => {
  if (typeof selector !== 'string') {
    selector = selector.map(build).toJS()
  }

  ({ source, context, selector } = params(source, context, selector))

  return x(source, context, selector)
}

const buildable = (value, key) => {
  return value instanceof Immutable.Map && typeof key === 'string'
}

module.exports = harvest
