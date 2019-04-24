/**
 * convert a value to be a promise defer
 * @param {*|Promise} input
 * @param {function} [fn] a function which return new value by using previous await return value
 * @return {Promise}
 * @example
 * const afn = asyncx((x) => {
  *  let a = awaitx(x, x => x + 1)
  *  let b = awaitx(a, a => a + 2)
  *  return b
  * })
  *
  * let a = awaitx(afn(55)) // 58
  * let b = awaitx(a, a => a + 12) // 70
  * b.then((y) => console.log(y))
  */
 export default function awaitx(input, fn) {
   if (typeof fn === 'function') {
      return new Promise((resolve, reject) => {
        Promise.resolve(input).then(fn).then(resolve).catch(reject)
      })
   }
   else {
      return Promise.resolve(input)
   }
 }
