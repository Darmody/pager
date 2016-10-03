import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import {
  GITHUB_EVENTS_REQUEST,
  GITHUB_EVENTS_SUCCESS,
  GITHUB_EVENTS_FAILURE,
} from 'constants/ActionTypes'
import githubClient from 'httpClients/githubClient'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ param }) {
  return yield call(githubClient.events, param)
}

function* callRequest({ payload }) {
  yield httpRequestHandler(
    request,
    payload,
    [
      GITHUB_EVENTS_REQUEST,
      GITHUB_EVENTS_SUCCESS,
      GITHUB_EVENTS_FAILURE,
    ],
  )
}

function* watchRequest() {
  yield takeEvery(GITHUB_EVENTS_REQUEST, callRequest)
}

export default function* watch() {
  yield fork(watchRequest)
}
