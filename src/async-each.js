import $await from './await'
import asyncI from './async-iterate'

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
  return asyncI(items, (item, i, next) => $await(fn(item, i, items), next))
}
