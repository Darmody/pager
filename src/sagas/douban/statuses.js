import moment from 'moment'
import { takeEvery } from 'redux-saga'
import { call, fork, put, select } from 'redux-saga/effects'
import {
  DOUBAN_STATUSES_REQUEST,
  DOUBAN_STATUSES_SUCCESS,
  DOUBAN_STATUSES_FAILURE,
} from 'constants/ActionTypes'
import doubanClient from 'httpClients/doubanClient'
import { refreshAuth } from 'actions/douban'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ param }) {
  return yield call(doubanClient.statuses, param)
}

function* callRequest({ payload }) {
  const currentAt = moment()
  const expiredAt = moment((yield select(state => state.auth.douban.expiredAt)))

  if (currentAt.isBefore(expiredAt)) {
    yield httpRequestHandler(
      request,
      payload,
      [
        DOUBAN_STATUSES_REQUEST,
        DOUBAN_STATUSES_SUCCESS,
        DOUBAN_STATUSES_FAILURE,
      ],
    )
  } else {
    const refreshToken = yield select(state => state.auth.douban.refreshToken)
    yield put(refreshAuth(refreshToken))
  }
}

function* watchRequest() {
  yield takeEvery(DOUBAN_STATUSES_REQUEST, callRequest)
}

export default function* watch() {
  yield fork(watchRequest)
}
