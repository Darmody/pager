import moment from 'moment'
import Immutable from 'seamless-immutable'
import { ipcRenderer as ipc } from 'electron'
import { handleActions } from 'redux-actions'
import {
  DOUBAN_AUTH_SUCCESS,
  DOUBAN_AUTH_FAILURE,
  DOUBAN_STATUSES_SUCCESS,
  AUTH_STORE,
  AUTH_CLEAN,
} from 'constants/ActionTypes'
import { doubanNotify } from 'utils/notification'

const initialState = Immutable({
  douban: {
    error: false,
    authed: false,
    token: null,
    userId: null,
    lastStatusId: '',
    refreshToken: null,
    expiredAt: null,
  },
  github: {
    error: false,
    authed: false,
  },
  twitter: {
    error: false,
    authed: false,
  },
  zhihu: {
    error: false,
    authed: false,
  },
})

export default handleActions({
  [DOUBAN_STATUSES_SUCCESS]: (state, { payload }) => {
    if (payload.length > 0 && payload[0].id !== state.douban.lastStatusId) {
      const { text, user, id } = payload[0]
      doubanNotify(text, user.small_avatar)
      const doubanAuth = { douban: { lastStatusId: id } }
      ipc.send('setAuthInfo:request', doubanAuth)
      return state.merge(doubanAuth, { deep: true })
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
        expiredAt: moment()
          .add((parseInt(payload.expires_in, 10) - (5 * 60)), 's').format(),
      }
    }
    ipc.send('setAuthInfo:request', doubanAuth)

    return state.merge(doubanAuth, { deep: true })
  },
  [DOUBAN_AUTH_FAILURE]: (state) => {
    const doubanAuth = {
      douban: {
        ...initialState.douban,
        error: true,
      },
    }

    ipc.send('setAuthInfo:request', doubanAuth)
    return state.merge(doubanAuth, { deep: true })
  },
  [AUTH_CLEAN]: (state, { payload }) => {
    ipc.send('setAuthInfo:request', initialState[payload.app])
    return state.merge({
      [payload.app]: initialState[payload.app],
    }, { deep: true })
  },
  [AUTH_STORE]: (state, { payload }) => state.merge(payload.data)
}, initialState)
