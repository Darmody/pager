import { createAction } from 'redux-actions'
import {
  AUTH_STORE,
} from 'constants/ActionTypes'

export const store = createAction( // eslint-disable-line import/prefer-default-export
  AUTH_STORE, data => ({ data })
)
