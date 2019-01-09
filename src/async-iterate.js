import $async from './async'
import $await from './await'

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
 */
export default function asyncIterate(items, fn) {
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
        return new Promise((next, stop) => afn(item, i ++, next, stop)).then(through).catch(reject)
      }
      through()
    })
  })
}
