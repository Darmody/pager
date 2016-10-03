import { fork } from 'redux-saga/effects'

import douban from './douban'
import zhihu from './zhihu'
import github from './github'

export default function* saga() {
  yield fork(douban)
  yield fork(zhihu)
  yield fork(github)
}
