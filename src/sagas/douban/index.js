import { fork } from 'redux-saga/effects'
import watchAuth from './auth'
import watchStatuses from './statuses'

export default function* douban() {
  yield fork(watchAuth)
  yield fork(watchStatuses)
}
