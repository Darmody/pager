import { fork } from 'redux-saga/effects'

import douban from './douban'

export default function* saga() {
  yield fork(douban)
}
