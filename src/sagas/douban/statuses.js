import { takeEvery } from 'redux-saga'
import { call, select, fork } from 'redux-saga/effects'
import {
  DOUBAN_STATUSES_REQUEST,
  DOUBAN_STATUSES_SUCCESS,
  DOUBAN_STATUSES_FAILURE,
} from 'constants/ActionTypes'
import doubanClient from 'httpClients/doubanClient'
import { doubanNotify } from 'utils/notification'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ param }) {
  return yield call(doubanClient.statuses, param)
}

function* callRequest({ payload }) {
  yield httpRequestHandler(
    request,
    payload,
    [
      DOUBAN_STATUSES_REQUEST,
      DOUBAN_STATUSES_SUCCESS,
      DOUBAN_STATUSES_FAILURE,
    ],
  )
}

function* watchRequest() {
  yield takeEvery(DOUBAN_STATUSES_REQUEST, callRequest)
}

function* onSuccess({ payload }) {
  const lastId = yield select(state => state.auth.douban.lastStatusId)
  if (payload.length > 0 && payload[0].id !== lastId) {
    const { text, user } = payload[0]
    doubanNotify(text, user.small_avatar)
  }
}

function* watchSuccess() {
  yield takeEvery(DOUBAN_STATUSES_SUCCESS, onSuccess)
}

export default function* watch() {
  yield fork(watchRequest)
  yield fork(watchSuccess)
}
