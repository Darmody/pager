import { createAction } from 'redux-actions'
import {
  ZHIHU_AUTH_REQUEST,
} from 'constants/ActionTypes'

export const auth = createAction( // eslint-disable-line import/prefer-default-export
  ZHIHU_AUTH_REQUEST, (username, password) => ({ username, password })
)
