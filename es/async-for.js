import asyncE from './async-each.js'

export function asyncFor(start, stop, step, fn) {
  const items = new Array(Math.floor(stop - start / step)).fill(1)
  return asyncE(items, (_, i) => fn(start + step * i))
}
export default asyncFor
