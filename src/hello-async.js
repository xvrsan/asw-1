import asyncEach from './async-each'
import { $async, $await } from './async-await'
import asyncIterate from './async-iterate'
import asyncSerial from './async-serial'
import asyncParallel from './async-parallel'

const HelloAsync = {
  asyncEach,
  asyncE: asyncEach,
  asyncIterate,
  asyncI: asyncIterate,
  asyncSerial,
  asyncS: asyncSerial,
  asyncParallel,
  asyncP: asyncParallel,
  $async,
  $await,
}

export {
  asyncEach,
  asyncEach as asyncE,
  asyncIterate,
  asyncIterate as asyncI,
  asyncSerial,
  asyncSerial as asyncS,
  asyncParallel,
  asyncParallel as asyncP,
  $async,
  $await,
}

export default HelloAsync
