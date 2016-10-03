import { fork } from 'redux-saga/effects'
import watchAuth from './auth'

export default function* zhihu() {
  yield fork(watchAuth)
}
