import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, withHandlers, lifecycle } from 'recompose'
import CSSModules from 'react-css-modules'
import AuthApp from 'components/AuthApp'
import { auth } from 'actions/douban'
import { clean } from 'actions/auth'
import shortid from 'utils/shortid'
import styles from './styles.scss'
import doubanIcon from './douban.png'

const DoubanApp = ({
  authError,
  authed,
  showingApp, showApp,
  appKey,
  username, password, onUsernameChange, onPasswordChange, onLogin, onLogout,
}) => (
  <AuthApp
    appName="豆瓣"
    appIcon={doubanIcon}
    appTheme="#06c012"
    appKey={appKey}
    authed={authed}
    showApp={showApp}
    showingApp={showingApp}
  >
    <form styleName="binding-section">
      { authError && (<div styleName="error-message">账号绑定出错啦</div>) }
      {
        !authed && (
          <div styleName="login-section">
            <input
              type="text"
              name="username"
              styleName="binding-input"
              value={username}
              placeholder="Username"
              onChange={onUsernameChange}
            />
            <input
              type="password"
              name="password"
              styleName="binding-input"
              value={password}
              placeholder="Password"
              onChange={onPasswordChange}
            />
            <button
              type="button" onClick={onLogin} styleName="login-button"
            >
              登录
            </button>
          </div>
        )
      }
      {
        authed && (
          <button
            type="button" onClick={onLogout} styleName="logout-button"
          >
            退出
          </button>
        )
      }
    </form>
  </AuthApp>
)

const enhancer = _.compose(
  setDisplayName('DoubanApp'),
  connect(
    state => ({
      authError: state.auth.douban.error,
      authed: state.auth.douban.authed,
    }),
    dispatch => ({
      ...bindActionCreators({ auth, clean }, dispatch)
    })
  ),
  withState('appKey', 'setAppKey', null),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onUsernameChange: props => event => props.setUsername(event.target.value),
    onPasswordChange: props => event => props.setPassword(event.target.value),
    onLogin: props => () => props.auth(props.username, props.password),
    onLogout: props => () => props.clean('douban'),
  }),
  lifecycle({
    componentWillMount() {
      this.props.setAppKey(shortid())
    }
  }),
  CSSModules(styles),
)

export default enhancer(DoubanApp)
