import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import {
  ZHIHU_AUTH_REQUEST,
  ZHIHU_AUTH_SUCCESS,
  ZHIHU_AUTH_FAILURE,
} from 'constants/ActionTypes'
import zhihuClient from 'httpClients/zhihuClient'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ username, password, token }) {
  return yield call(zhihuClient.auth, { username, password, token })
}

function* authRequest({ payload }) {
  yield httpRequestHandler(
    request,
    payload,
    [
      ZHIHU_AUTH_REQUEST,
      ZHIHU_AUTH_SUCCESS,
      ZHIHU_AUTH_FAILURE,
    ],
  )
}

export default function* wathAuth() {
  yield takeEvery(ZHIHU_AUTH_REQUEST, authRequest)
}
