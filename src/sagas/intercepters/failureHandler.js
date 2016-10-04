import { put } from 'redux-saga/effects'
import { isAuthAction } from 'utils/actionHelper'
import { failed } from 'actions/auth'

function* failureHandler(response, failureType, meta) {
  yield put({ type: failureType, error: true, payload: response, meta })
  if (isAuthAction(failureType)) {
    yield put(failed())
  }
}

export default failureHandler
