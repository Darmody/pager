import { fork } from 'redux-saga/effects'
import watchEvents from './events'

export default function* github() {
  yield fork(watchEvents)
}
