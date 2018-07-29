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
  asyncFn,
  asyncEach,
  asyncIterate,
  asyncSerial,
  asyncParallel,
} from 'hello-async/src/hello-async'
```

CommonJS:

```
const {
  asyncFn,
  asyncEach,
  asyncIterate,
  asyncSerial,
  asyncParallel,
} = require('hello-async')
```

## API

### asyncFn(fn)

Convert a function to be async function, no matter it is a normal function or an async function.

```
let fn = (arg1) => { ... }
let afn = asyncFn(fn)
await afn('xxx')
```

### asyncEach(items, async fn)

Traverse items with async function.

```
let items = [...]
let newItems = await asyncEach(items, async (item, i) => {
  // ...
  return item
})
```

New items will be returned when all async function finish.

### asyncIterate(items, async fn)

Iterate items with async function.

```
let items = []
let newItems = await asyncEach(items, async (item, i, next, stop) => {
  // ...
})
```

**next**

Iterate to next item.

**stop**

Stop iterating. The left iterator functions will not run any more.

### asyncSerial(fns, ...args)

Calculate with args by async functions in serial.

```
let fns = [
  async (arg1, arg2) => { ... },
  async (arg1, arg2) => { ... },
]
let result = await asyncSerial(fns, xx1, xx2)
```

Async functions will run one by one after each resolved, if one rejected, the letf ones will not run any more.

### asyncParallel(fns, ...args)

Calculate with args by async functions in parallel.

```
let fns = [
  async (arg1, arg2) => { ... },
  async (arg1, arg2) => { ... },
]
let result = await asyncParallel(fns, xx1, xx2)
```

Async functions will start at the same time, if one rejected, you will not get result, however anthors will run.