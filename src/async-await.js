/**
 * convert a function to be an async function, 
 * @param {function} fn a normal function or an async function
 * @return {function} a function which return a promise
 * @example 
 * let func = (a) => { return a + 1 } // or: let func = async (a) => { ... }
 * let afn = $async(func)
 * afn('xxx').then((b) => {
 *  console.log(b)
 * })
 */
export function $async(fn) {
  if (typeof fn !== 'function') {
    throw new Error('$async should receive a function as parameter.')
  }
  return (...args) => {
    return new Promise((resolve, reject) => {
      Promise.resolve().then(() => fn(...args)).then(resolve).catch(reject)
    })
  }
}

/**
 * convert a value to be a promise defer
 * @param {*|Promise} input 
 * @param {function} [calc] a function which return new value by using previous $await return value 
 * @param {Promise}
 * @example
 * const afn = $async((x) => {
 *  let a = $await(x, x => x + 1)
 *  let b = $await(a, a => a + 2)
 *  return b
 * })
 * 
 * let a = $await(afn(55)) // 58
 * let b = $await(a, a => a + 12) // 70
 */
export function $await(input, calc) {
  const defering = (input) => {
    return Promise.resolve(input)
  }
  if (typeof calc === 'function') {
    return new Promise((resolve, reject) => {
      defering(input).then($async(calc)).then(resolve).catch(reject)
    })
  }
  else {
    return defering(input)
  }
}