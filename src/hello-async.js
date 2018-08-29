import { $async, $await } from './async-await'
import asyncEach from './async-each'
import asyncMap from './async-map'
import asyncIterate from './async-iterate'
import asyncSerial from './async-serial'
import asyncParallel from './async-parallel'

const HelloAsync = {
  asyncEach,
  asyncE: asyncEach,
  asyncMap,
  asyncM: asyncMap,
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
  asyncE: asyncEach,
  asyncMap,
  asyncM: asyncMap,
  asyncIterate,
  asyncI: asyncIterate,
  asyncSerial,
  asyncS: asyncSerial,
  asyncParallel,
  asyncP: asyncParallel,
  $async,
  $await,
}

export default HelloAsync
