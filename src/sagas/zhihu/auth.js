import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  ZHIHU_AUTH_REQUEST,
  ZHIHU_AUTH_SUCCESS,
  ZHIHU_AUTH_FAILURE,
} from 'constants/ActionTypes'
import zhihuClient from 'httpClients/zhihuClient'
import { cleanCaptcha, triggerCaptcha } from 'actions/zhihu'
import httpRequestHandler from '../intercepters/httpRequestHandler'

function* request({ username, password, token }) {
  return yield call(zhihuClient.auth, { username, password, token })
}

function* captchaValidate() {
  const response = yield zhihuClient.needCaptcha()

  if (response.ok) {
    const responseJson = yield response.json()

    if (!responseJson.show_captcha) {
      return false
    }
  }

  return true
}

function* authRequest({ payload }) {
  const needCaptcha = yield captchaValidate()

  if (!needCaptcha) {
    yield httpRequestHandler(
      request,
      payload,
      [
        ZHIHU_AUTH_REQUEST,
        ZHIHU_AUTH_SUCCESS,
        ZHIHU_AUTH_FAILURE,
      ],
    )
  } else {
    yield put(triggerCaptcha())
    setTimeout(function* clean() { yield put(cleanCaptcha()) }, 60 * 60 * 1000)
  }
}

export default function* wathAuth() {
  yield takeEvery(ZHIHU_AUTH_REQUEST, authRequest)
}
