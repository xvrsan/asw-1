/**
 * convert a function to be an async function, 
 * @param {function} fn a normal function or an async function
 * @param {boolean} [defer] whether to run fn in an async thread, default is 'true'
 * @return {function} a function which return a promise
 * @example 
 * let func = (a) => { return a + 1 } // or: let func = async (a) => { ... }
 * let afn = $async(func)
 * afn('xxx').then((b) => {
 *  console.log(b)
 * })
 */
export function $async(fn, defer = true) {
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
 * @param {function} [fn] a function which return new value by using previous $await return value 
 * @param {boolean} [direct] whether to use `input` directly, default is 'false'
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
export function $await(input, fn, direct = false) {
  if (direct) {
		return typeof fn === 'function' ? fn(input) : input;
	}

  const defer = (input) => {
    return Promise.resolve(input)
  }
  if (typeof fn === 'function') {
    return new Promise((resolve, reject) => {
      defer(input).then($async(fn)).then(resolve).catch(reject)
    })
  }
  else {
    return defer(input)
  }
}