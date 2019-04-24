/**
 * convert a function to be an async function,
 * @param {function} fn a normal function or an async function
 * @param {boolean} [native] whether to run fn as native async function do
 * @return {function} a function which return a promise
 * @example
 * let func = (a) => { return a + 1 } // or: let func = async (a) => { ... }
 * let afn = asyncx(func)
 * afn('xxx').then((b) => {
 *  console.log(b)
 * })
 */
export default function asyncx(fn, native = false) {
  return function(...args) {
    if (!native) {
      return new Promise((resolve, reject) => {
        Promise.resolve().then(() => fn.call(this, ...args)).then(resolve).catch(reject)
      })
    }

    // native async function behaviour
    try {
      return Promise.resolve(fn.call(this, ...args))
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
}
