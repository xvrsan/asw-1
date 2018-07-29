import asyncFn from './async-fn'

/**
 * traverse items with async function
 * @param {array} items
 * @param {function} fn
 * Notice: fn is not an iterator function, it will run in parallel
 * @return {array} Promise with new items resolved
 * @example
 * let items = [...]
 * let newItems = await asyncEach(items, async (item, i) => {
 *   let res = await fetch(url, item)
 *   let data = await res.json()
 *   return data
 * })
 */
export default function asyncEach(items, fn) {
  return Promise.resolve().then(() => {
    let promises = []
    let afn = asyncFn(fn)
    items.forEach((item, i) => {
      promises.push(afn(item, i))
    })
    return Promise.all(promises)
  })
}