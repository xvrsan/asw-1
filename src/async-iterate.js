import { $async, $await } from './async-await'

/**
 * iterate items with async function
 * @param {array} items
 * @param {function} fn
 * @return {undefined}
 * @example
 * let items = [...]
 * await asyncIterate(items, async (item, i, next, stop) => {
 *   let res = await fetch(url, item)
 *   if (res.code === 0) {
 *     next()
 *   }
 *   else {
 *     stop()
 *   }
 * })
 * 
 * // `next` and `stop` are optional, it is determined by your iterator function
 * await asyncIterate(items, async (item, i) => {
 *   //...
 * })
 */
export default function asyncIterate(items, fn) {
  if (!Array.isArray(items)) {
    throw new Error('asyncIterate should receive an array as first parameter.')
  }
  if (typeof fn !== 'function') {
    throw new Error('asyncIterate should receive a function as the second parameter.')
  }
  return $await(items, (items) => {
    return new Promise((resolve, reject) => {
      let i = 0
      let through = () => {
        let item = items[i]
        if (!item) {
          resolve()
          return
        }
        let afn = $async(fn)
        return new Promise((next, stop) => {
          if (fn.length > 2) {
            afn(item, i ++, next, stop)
          }
          else {
            afn(item, i ++).then(next).catch(stop)
          }
        }).then(through).catch(reject)
      }
      through()
    })
  })
}