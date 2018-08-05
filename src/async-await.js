/**
 * convert a function to be an async function, 
 * @param {function} fn a normal function or an async function
 * @return {function} a function which return a promise
 * @example 
 * let afn = $async(function(url) {
 *  let res = $await(fetch(url))
 *  let data = $await(res, res => res.json())
 *  return data
 * })
 * afn('xxx').then((data) => {
 *  console.log(data)
 * })
 */
export function $async(fn) {
  if (typeof fn !== 'function') {
    throw new Error('$async should receive a function as parameter.')
  }
  return (...args) => {
    try {
      return Promise.resolve(fn(...args))
    }
    catch(e) {
      return Promise.reject(e)
    }
  }
}

/**
 * convert a value to be a promise defer
 * @param {*|Promise} input 
 * @param {function} [then] a function which return new value by using previous $await return value 
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
 * 
 * b.then(b => console.log(b))
 */
export function $await(input, then) {
  if (typeof then === 'function') {
    return Promise.resolve(input).then(then)
  }
  else {
    return Promise.resolve(input)
  }
}
