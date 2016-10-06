import { createAction } from 'redux-actions'
import {
  ZHIHU_AUTH_REQUEST,
  ZHIHU_CAPTCHA_TRIGGER,
  ZHIHU_CAPTCHA_CLEAN,
  ZHIHU_FEED_REQUEST,
} from 'constants/ActionTypes'

export const auth = createAction(
  ZHIHU_AUTH_REQUEST, (username, password) => ({ username, password })
)

export const triggerCaptcha = createAction(ZHIHU_CAPTCHA_TRIGGER)

export const cleanCaptcha = createAction(ZHIHU_CAPTCHA_CLEAN)

export const feeds = createAction(
  ZHIHU_FEED_REQUEST, (token, count) => ({ token, count })
)
