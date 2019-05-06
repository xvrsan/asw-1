import asyncx from './asyncx'
import awaitx from './awaitx'

/**
 * run async function in serial, async function will run one by one,
 * if one async function rejected, the following ones will not run any more
 * @param {array} fns
 * @param {*} args
 * @return {*} the last fn's return out
 * @example
 * let fns = []
 * let v = await asyncSeries(fns, arg1, arg2)
 */
export function asyncSeries(fns, ...args) {
  return awaitx(fns, (fns) => {
    let i = 0
    let through = (params) => {
      let fn = fns[i]
      if (!fn) {
        return params
      }
      i ++
      let afn = asyncx(fn)
      return afn(...args).then(through)
    }
    return through(args)
  })
}
export default asyncSeries
