import { isAuthAction } from 'utils/actionHelper'
import { end } from 'actions/auth'
import { put } from 'redux-saga/effects'

function* successHandler(response, successType, schema, meta) {
  const responseJson = response.status === 204 ? {} : yield response.json()

  yield put({ type: successType, payload: responseJson, meta })
  if (isAuthAction(successType)) {
    yield put(end())
  }
}

export default successHandler
