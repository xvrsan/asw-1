import asyncx from './asyncx'
import awaitx from './awaitx'

/**
 * run async functions in parallel, functions will begin at the same time,
 * and wait all functions finished the last function's return value will be output
 * @param {array} fns
 * @param {*} args
 * @return {*}
 */
export default function asyncParallel(fns, ...args) {
  return awaitx(fns, (fns) => {
    let promises = []
    fns.forEach((fn) => {
      let afn = asyncx(fn)
      let defer = afn(...args)
      promises.push(defer)
    })
    return Promise.all(promises)
  })
}
