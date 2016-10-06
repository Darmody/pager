import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import {
  ZHIHU_FEED_REQUEST,
  ZHIHU_FEED_SUCCESS,
  ZHIHU_FEED_FAILURE,
} from 'constants/ActionTypes'
import zhihuClient from 'httpClients/zhihuClient'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request(param) {
  return yield call(zhihuClient.feeds, param)
}

function* callRequest({ payload }) {
  yield httpRequestHandler(
    request,
    payload,
    [
      ZHIHU_FEED_REQUEST,
      ZHIHU_FEED_SUCCESS,
      ZHIHU_FEED_FAILURE,
    ],
  )
}

function* watchRequest() {
  yield takeEvery(ZHIHU_FEED_REQUEST, callRequest)
}

export default function* watch() {
  yield fork(watchRequest)
}
