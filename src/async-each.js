import { $async, $await } from './async-await'

/**
 * traverse items with async function one by one
 * @param {Array} items
 * @param {Function} fn
 * @return {Promise}
 * @example
 * let items = [...]
 * await asyncEach(items, async (item, i) => {
 *   let res = await fetch(url, item)
 *   let data = await res.json()
 *   return data
 * })
 */
export default function asyncEach(items, fn) {
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
          afn(item, i ++).then(next).catch(stop)
        }).then(through).catch(reject)
      }
      through()
    })
  })
}
