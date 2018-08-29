import { $async, $await } from './async-await'

/**
 * traverse items with async function return new items with promise
 * @param {array} items
 * @param {function} fn
 * Notice: fn is not an iterator function, it will run in parallel
 * @return {array} Promise with new items resolved
 * @example
 * let items = [...]
 * let newItems = await asyncEach(items, async (item, i, items) => {
 *   let res = await fetch(url, item)
 *   let data = await res.json()
 *   return data
 * })
 */
export default function asyncMap(items, fn) {
  if (!Array.isArray(items)) {
    throw new Error('asyncEach should receive an array as first parameter.')
  }
  if (typeof fn !== 'function') {
    throw new Error('asyncEach should receive a function as the second parameter.')
  }
  return $await(items, (items) => {
    let promises = []
    let afn = $async(fn)
    items.forEach((item, i) => {
      promises.push(afn(item, i, items))
    })
    return Promise.all(promises)
  })
}
