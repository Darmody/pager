import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import {
  DOUBAN_AUTH_REQUEST,
  DOUBAN_AUTH_SUCCESS,
  DOUBAN_AUTH_FAILURE,
} from 'constants/ActionTypes'
import doubanClient from 'httpClients/doubanClient'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ username, password }) {
  return yield call(doubanClient.auth, { username, password })
}

function* authRequest({ payload }) {
  yield httpRequestHandler(
    request,
    payload,
    [
      DOUBAN_AUTH_REQUEST,
      DOUBAN_AUTH_SUCCESS,
      DOUBAN_AUTH_FAILURE,
    ],
  )
}

export default function* wathAuth() {
  yield takeEvery(DOUBAN_AUTH_REQUEST, authRequest)
}
