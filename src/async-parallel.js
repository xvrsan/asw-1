import { async$, await$ } from './async-await'

/**
 * run async functions in parallel, functions will begin at the same time,
 * and wait all functions finished the last function's return value will be output
 * @param {array} fns
 * @param {*} args
 * @return {*} the return out of last executed fn
 * let fns = []
 * let v = await asyncSerial(fns, arg1, arg2)
 */
export default function asyncParallel(fns, ...args) {
  return await$(fns, (fns) => {
    let promises = []
    let result = args
    fns.forEach((fn) => {
      let afn = async$(fn)
      let defer = afn(...args).then(res => result = res)
      promises.push(defer)
    })
    return Promise.all(promises).then(() => result)
  })
}
