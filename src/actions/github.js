import { createAction } from 'redux-actions'
import {
  GITHUB_AUTH,
  GITHUB_EVENTS_REQUEST,
} from 'constants/ActionTypes'

export const auth = createAction( // eslint-disable-line import/prefer-default-export
  GITHUB_AUTH, username => ({ username })
)

export const events = createAction( // eslint-disable-line import/prefer-default-export
  GITHUB_EVENTS_REQUEST, param => ({ param })
)
