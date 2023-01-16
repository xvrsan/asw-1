import asyncIterate from './async-iterate.js'

export function asyncFor(start, end, step, fn) {
  const items = []
  let curr = start
  while (curr <= end) {
    items.push(curr)
    curr += step
  }
  return asyncIterate(items, (i, _, next, stop, complete) => {
    return fn(i, next, stop, complete)
  })
}
export default asyncFor
