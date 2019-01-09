import $async from './async'
import $await from './await'

/**
 * run async functions in parallel, functions will begin at the same time,
 * and wait all functions finished the last function's return value will be output
 * @param {array} fns
 * @param {*} args
 * @return {*} the return out of last executed fn
 * let fns = []
 * let v = await asyncSerial(fns, arg1, arg2)
 */
export default function asyncParallelize(fns, ...args) {
  return $await(fns, (fns) => {
    let promises = []
    fns.forEach((fn) => {
      let afn = $async(fn)
      let defer = afn(...args)
      promises.push(defer)
    })
    return Promise.all(promises)
  })
}
