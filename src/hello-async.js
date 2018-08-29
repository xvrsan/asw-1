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
  asyncMap,
  asyncIterate,
  asyncSerial,
  asyncParallel,
  asyncEach as asyncE,
  asyncMap as asyncM,
  asyncIterate as asyncI,
  asyncSerial as asyncS,
  asyncParallel as asyncP,
  $async,
  $await,
}

export default HelloAsync
