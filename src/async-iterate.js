import asyncFn from './async-fn'

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
  return Promise.resolve().then(() => {
    return new Promise((resolve, reject) => {
      let i = 0
      let through = () => {
        let item = items[i]
        if (!item) {
          resolve()
          return
        }
        let afn = asyncFn(fn)
        return new Promise((next, stop) => afn(item, i ++, next, stop).then(next).catch(stop)).then(through).catch(reject)
      }
      through()
    })  
  })
}