import { createAction } from 'redux-actions'
import {
  AUTH_STORE,
  AUTH_CLEAN,
  AUTH_START,
  AUTH_FAILED,
  AUTH_END,
} from 'constants/ActionTypes'

export const store = createAction( // eslint-disable-line import/prefer-default-export
  AUTH_STORE, data => ({ data })
)

export const clean = createAction(
  AUTH_CLEAN, app => ({ app })
)

export const start = createAction(
  AUTH_START
)

export const failed = createAction(
  AUTH_FAILED
)

export const end = createAction(
  AUTH_END
)
