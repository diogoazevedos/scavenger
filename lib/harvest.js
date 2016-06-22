import ray from 'x-ray'
import params from './params'
import { Map, fromJS } from 'immutable'

const x = ray()

export default (source, context, selector) => {
  return harvest(source, context, fromJS(selector))
}

const harvest = (source, context, selector) => {
  if (typeof selector !== 'string') {
    selector = selector.map(build).toJS()
  }

  ({ source, context, selector } = params(source, context, selector))

  return x(source, context, selector)
}

const build = (value, key) => {
  if (typeof key === 'string' && value instanceof Map) {
    const { source, context, selector } = value

    return harvest(source, context, selector)
  }

  return value
}
