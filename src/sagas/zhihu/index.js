import { fork } from 'redux-saga/effects'
import watchAuth from './auth'
import watchFeed from './feeds'

export default function* zhihu() {
  yield fork(watchAuth)
  yield fork(watchFeed)
}
