import _ from 'ramda'
import { AUTH_CLEAN, AUTH_START, AUTH_END } from 'constants/ActionTypes'

export const isAuthAction = // eslint-disable-line import/prefer-default-export
  action => _.test(/AUTH/, action) && !_.contains(action, [
    AUTH_CLEAN, AUTH_START, AUTH_END,
  ])
