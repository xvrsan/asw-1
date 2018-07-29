/**
 * convert a function to be an async function, 
 * no matter it is a normal function or an async function
 * @param {function} fn 
 * @return {function}
 */
export default function asyncFn(fn) {
  return (...args) => {
    return Promise.resolve().then(() => fn(...args))
  }
}