import asyncx from './asyncx'
import awaitx from './awaitx'

/**
 * traverse items with async function return new items with promise
 * @param {array} items
 * @param {function} fn
 * Notice: fn is not an iterator function, it will run in parallel
 * @return {array} Promise with new items resolved
 * @example
 * let items = [...]
 * let newItems = await asyncMap(items, async (item, i, items) => {
 *   let res = await fetch(url, item)
 *   let data = await res.json()
 *   return data
 * })
 */
export function asyncMap(items, fn) {
  return awaitx(items, (items) => {
    let promises = []
    let afn = asyncx(fn)
    items.forEach((item, i) => {
      promises.push(afn(item, i, items))
    })
    return Promise.all(promises)
  })
}
export default asyncMap
