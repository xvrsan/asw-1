/**
 * convert a function to be an async function,
 * @param {function} fn a normal function or an async function
 * @param {boolean} [native] whether to run fn as native async function do
 * @return {function} a function which return a promise
 * @example
 * let func = (a) => { return a + 1 } // or: let func = async (a) => { ... }
 * let afn = $async(func)
 * afn('xxx').then((b) => {
 *  console.log(b)
 * })
 */
export default function $async(fn, native = false) {
  return (...args) => {
    if (!native) {
      return new Promise((resolve, reject) => {
        Promise.resolve().then(() => fn(...args)).then(resolve).catch(reject)
      })
    }

    // native async function behaviour
    try {
      return Promise.resolve(fn(...args))
    }
    catch(e) {
      return Promise.reject(e);
    }
  }
}
