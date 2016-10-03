import { fork } from 'redux-saga/effects'

import douban from './douban'
import zhihu from './zhihu'

export default function* saga() {
  yield fork(douban)
  yield fork(zhihu)
}
