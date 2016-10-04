import { isAuthAction } from 'utils/actionHelper'
import { put } from 'redux-saga/effects'
import { start } from 'actions/auth'

function* requestHandler(type) {
  if (isAuthAction(type)) {
    yield put(start())
  }
}

export default requestHandler
