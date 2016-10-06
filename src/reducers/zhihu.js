import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import {
  ZHIHU_CAPTCHA_TRIGGER,
  ZHIHU_CAPTCHA_CLEAN,
} from 'constants/ActionTypes'

const initialState = Immutable({
  needCaptcha: false,
})

export default handleActions({
  [ZHIHU_CAPTCHA_TRIGGER]: state => state.merge({ needCaptcha: true }),
  [ZHIHU_CAPTCHA_CLEAN]: state => state.merge({ needCaptcha: false }),
}, initialState)
