import $async from './async'

/**
 * convert a value to be a promise defer
 * @param {*|Promise} input
 * @param {function} [fn] a function which return new value by using previous await return value
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
 export default function $await(input, fn) {
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
