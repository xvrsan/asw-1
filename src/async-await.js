/**
 * convert a function to be an async function, 
 * @param {function} fn a normal function or an async function
 * @param {boolean} defer whether to run fn in an async thread, default is 'false'
 * notice, default behaviour is different from native async syntax, for example:
 * `
 * async function afn() {
 *  console.log(1)
 * }
 * afn()
 * console.log(2)
 * `
 * console will log `1 2`, however if you use `$async` with `defer` to be ture, console will log `2 1`
 * @return {function} a function which return a promise
 * @example 
 * let func = (a) => { return a + 1 } // or: let func = async (a) => { ... }
 * let afn = $async(func)
 * afn('xxx').then((b) => {
 *  console.log(b)
 * })
 */
export function $async(fn, defer = false) {
  if (typeof fn !== 'function') {
    throw new Error('$async should receive a function as parameter.')
  }
  return (...args) => {
    if (defer) {
      return new Promise((resolve, reject) => {
        Promise.resolve().then(() => fn(...args)).then(resolve).catch(reject)
      })
    }

    try {
      return Promise.resolve(fn(...args));
    } 
    catch(e) {
      return Promise.reject(e);
    }
  }
}

/**
 * convert a value to be a promise defer
 * @param {*|Promise} input 
 * @param {function} [then] a function which return new value by using previous $await return value 
 * @param {boolean} [direct] whether to return input wrapper by then directly, default is 'false'
 * @return {Promise}
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
export function $await(input, then, direct = false) {
  if (direct) {
		return typeof then === 'function' ? then(input) : input;
	}

  const defering = (input) => {
    return Promise.resolve(input)
  }
  if (typeof then === 'function') {
    return new Promise((resolve, reject) => {
      defering(input).then($async(then)).then(resolve).catch(reject)
    })
  }
  else {
    return defering(input)
  }
}