import asyncIterate from './async-iterate.js'
import awaitx from './awaitx.js'

export function asyncFind(items, fn) {
  return asyncIterate(items, (item, i, next, stop, complete) => awaitx(fn(item, i, items)).then((res) => {
    if (res) {
      complete(item)
      return
    }
    next()
  }, stop))
}
export default asyncFind
