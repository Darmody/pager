import { createAction } from 'redux-actions'
import {
  AUTH_STORE,
  AUTH_CLEAN,
} from 'constants/ActionTypes'

export const store = createAction( // eslint-disable-line import/prefer-default-export
  AUTH_STORE, data => ({ data })
)

export const clean = createAction(
  AUTH_CLEAN, app => ({ app })
)

