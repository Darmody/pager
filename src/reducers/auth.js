import moment from 'moment'
import Immutable from 'seamless-immutable'
import { ipcRenderer as ipc } from 'electron'
import { handleActions } from 'redux-actions'
import {
  DOUBAN_AUTH_SUCCESS,
  DOUBAN_AUTH_FAILURE,
  DOUBAN_STATUSES_SUCCESS,
  GITHUB_EVENTS_SUCCESS,
  GITHUB_AUTH,
  AUTH_STORE,
  AUTH_CLEAN,
  AUTH_START,
  AUTH_FAILED,
  AUTH_END,
} from 'constants/ActionTypes'
import { doubanNotify, githubNotify } from 'utils/notification'

const initialState = Immutable({
  status: 'pending',
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
    username: '',
    lastEventId: '',
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
      doubanNotify(payload[0])
      const doubanAuth = { douban: { lastStatusId: payload[0].id } }
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
  [GITHUB_EVENTS_SUCCESS]: (state, { payload }) => {
    if (payload.length > 0 && payload[0].id !== state.github.lastEventId) {
      const { actor, repo, type, id } = payload[0]
      githubNotify(actor, repo, payload[0].payload, type)
      const githubAuth = { github: { lastEventId: id } }
      ipc.send('setAuthInfo:request', githubAuth)
      return state.merge(githubAuth, { deep: true })
    }

    return state
  },
  [GITHUB_AUTH]: (state, { payload }) => {
    const githubAuth = {
      github: {
        authed: true,
        username: payload.username,
      },
    }

    ipc.send('setAuthInfo:request', githubAuth)
    return state.merge(githubAuth, { deep: true })
  },
  [AUTH_CLEAN]: (state, { payload }) => {
    ipc.send('setAuthInfo:request', { [payload.app]: initialState[payload.app] })
    return state.merge({
      [payload.app]: initialState[payload.app],
    }, { deep: true })
  },
  [AUTH_STORE]: (state, { payload }) => state.merge(payload.data),
  [AUTH_START]: state => state.merge({ status: 'started' }),
  [AUTH_FAILED]: state => state.merge({ status: 'failed' }),
  [AUTH_END]: state => state.merge({ status: 'success' }),
}, initialState)
