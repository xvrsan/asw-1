# Hello Async

A library to help developer use async functions as promises.

## install

```
npm i -S hello-async
```

## Usage

ES6:

```
import {
  async$,
  await$,
  asyncE,
  asyncM,
  asyncI,
  asyncS,
  asyncP,
} from 'hello-async/src/hello-async'
```

CommonJS:

```
const {
  async$,
  await$,
  asyncE,
  asyncM,
  asyncI,
  asyncS,
  asyncP,
} = require('hello-async')
```

In browser:

```
<script src="node_modules/hello-async/dist/hello-async.js"></script>
<script>
const {
  async$,
  await$,
  asyncE,
  asyncM,
  asyncI,
  asyncS,
  asyncP,
} = window['hello-async']
</script>
```

Notice: native `Promise` should be supported.

## API

### async$(fn[, defer])

Convert a function to be async function, no matter it is a normal function or an async function.

```
// normal function:
let fn = (arg1) => { ... }
let afn = asyncFn(fn)

// async function:
let fn = async (arg1) => { ... }
let afn = asyncFn(fn)
```

It is useful when you do not know whether a function is an aysnc function or not in runtime.

```
function async calc(fn) {
  let v = await async$(fn)() // here I do not know whether `fn` is an async function or not
  return v
}
```

**navtive**

_default: false_

For ES default behaviour, async function will run synchronously before reach first `await` syntax, for example:

```
async function get(url) {
  console.log(1)
  await fetch(url)
  console.log(2)
}
get('...')
console.log(3)

// => 1
// => 3
// => 2
```

As default, `async$` converts a function to be a completely synchronous function.
If you want to use native behaviour, you can set `native` to be `true`:

```
const get = async$(function(url) {
  console.log(1)
  await$(fetch(url), () => console.log(2))
}, true) // notice here
get('...')
console.log(3)

// => 1
// => 3
// => 2
```

### await$(input, fn)

Convert a normal value or a promise to be a promise.

```
let x = 3
let a = await$(x) // a is a promise which resolve with `x`
let b = await$(a, a => a + 12) // b is a promise which resolve with `x + 12`

b.then(b => console.log(b)) // 16
```

Here, `a` and `b` are promises which resovle `fn` return value.

- input: a normal value or a promise instance
- fn: a function which use `input` to calculate, can be a normal function or an async function
- @return: a promise defer which resolved whith `fn` return value

Use async$ and await$ to write async function like:

```
const get = async$(function(url) {
  let res = await$(fetch(url))
  let data = await$(res, res => res.json())
  return data
})

/*
async function get(url) {
  let res = await fetch(url)
  let data = await res.json()
  return data
}
*/

get('http://xxx').then(data => { ... })
```

Here `get` function is defined very like an `async function`.
However, the syntax of `await` is much more easy than `await$`, here we have to use a function to calculate the value.

```
// usage1: with a normal value
let defer = await$('xxx')

// usage2: with a promise
let defer = await$(Promise.resolve('xxx'))

// usage3: with a normal value and a normal function
let defer = await$('xxx', x => x + 'xx')

// usage4: with a promise and normal function
let defer = await$(Promise.resolve('xxx'), x => x + 'xx')

// usage5: with a normal value and an async function
let defer = await$(url, async url => await fetch(url))
```

As you see, the first parameter can be a normal value or a promise, the second parameter can be a normal function or an async function.
If the first parameter is a promise, its resolve value will be used as the second paramater function's parameter.
The second parameter should be a function, its return value will be used as await$ return value.
If the second parameter is an async function, the resolve value will be used as await$ return value.

### asyncEach(items, fn)

_alias: asyncE(items, fn)_

Traverse items with async function one by one.

```
let items = [...]
await asyncEach(items, async (item, i, arr) => {
  // ...
})
```

### asyncMap(items, fn)

_alias: asyncM(items, fn)_

Traverse items with async function and return an new array in a promise.

```
let items = [...]
let newItems = await asyncEach(items, async (item, i) => {
  // ...
  return item
})
```

New items will be returned when all async function finish.
In a forEach loop, `fn` will run in parallel.

### asyncIterate(items, fn)

_alias: asyncI(items, fn)_

Iterate items with async function.

```
let items = []
await asyncIterate(items, async (item, i, next, stop) => {
  // ...
  setTimeout(next, 1000)
})
```

**next**

Iterate to next item.

**stop**

Stop iterating. The left iterator functions will not run any more.

Notice: `next()` or `stop()` should be called anyway! If you do not pass `next`, it will be treated as a resolved promise.

```
await asyncI(items, (item, i) => {
  console.log(item, i)
})
```

### asyncSerialize(fns, ...args)

_alias: asyncS(fns, ...args)_

Calculate with args by async functions in serial.

```
let fns = [
  async (arg1, arg2) => { ... },
  async (arg1, arg2) => { ... },
]
await asyncSerialize(fns, xx1, xx2)
```

Async functions will run with ...args one by one after each resolved, if one rejected, the letf ones will not run any more.

### asyncParallelize(fns, ...args)

_alias: asyncP(fns, ...args)_

Calculate with args by async functions in parallel.

```
let fns = [
  async (arg1, arg2) => { ... },
  async (arg1, arg2) => { ... },
]
await asyncParallelize(fns, xx1, xx2)
```

Async functions will start with ...args at the same time, if one rejected, anthors will still run.
