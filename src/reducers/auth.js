import moment from 'moment'
import Immutable from 'seamless-immutable'
import { ipcRenderer as ipc } from 'electron'
import { handleActions } from 'redux-actions'
import {
  DOUBAN_AUTH_SUCCESS,
  DOUBAN_AUTH_FAILURE,
  DOUBAN_STATUSES_SUCCESS,
  AUTH_STORE,
} from 'constants/ActionTypes'

const initialState = Immutable({
  douban: {
    error: false,
    authed: false,
    token: null,
    userId: null,
    lastStatusId: '',
    refreshToken: null,
    expiredAt: null,
  }
})

export default handleActions({
  [DOUBAN_STATUSES_SUCCESS]: (state, { payload }) => {
    if (payload.length > 0 && payload[0].id !== state.douban.lastStatusId) {
      return state.merge({ douban: { lastStatusId: payload[0].id } }, { deep: true })
    }

    return state
  },
  [DOUBAN_AUTH_SUCCESS]: (state, { payload }) => {
    const doubanAuth = {
      douban: {
        error: false,
        authed: true,
        token: payload.access_token,
        refreshToken: payload.refresh_token,
        userId: payload.douban_user_id,
        expiredAt: moment().add((parseInt(payload.expires_in, 10) - (5 * 60)), 's'),
      }
    }
    ipc.send('setAuthInfo:request', doubanAuth)

    return state.merge(doubanAuth, { deep: true })
  },
  [DOUBAN_AUTH_FAILURE]: state => state.merge({
    error: true,
    authed: false,
  }),
  [AUTH_STORE]: (state, { payload }) => state.merge(payload.data)
}, initialState)
