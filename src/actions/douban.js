import { createAction } from 'redux-actions'
import {
  DOUBAN_AUTH_REQUEST,
  DOUBAN_STATUSES_REQUEST,
} from 'constants/ActionTypes'

export const auth = createAction( // eslint-disable-line import/prefer-default-export
  DOUBAN_AUTH_REQUEST, (username, password) => ({ username, password })
)

export const statuses = createAction( // eslint-disable-line import/prefer-default-export
  DOUBAN_STATUSES_REQUEST, param => ({ param })
)
