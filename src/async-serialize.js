import $async from './async'
import $await from './await'

/**
 * run async function in serial, async function will run one by one,
 * if one async function rejected, the following ones will not run any more
 * @param {array} fns
 * @param {*} args
 * @return {*} the last fn's return out
 * @example
 * let fns = []
 * let v = await asyncSerial(fns, arg1, arg2)
 */
export default function asyncSerialize(fns, ...args) {
  return $await(fns, (fns) => {
    let i = 0
    let through = (params) => {
      let fn = fns[i]
      if (!fn) {
        return params
      }
      i ++
      let afn = $async(fn)
      return afn(...args).then(through)
    }
    return through(args)
  })
}
