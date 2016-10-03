import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, withHandlers, lifecycle } from 'recompose'
import AuthApp from 'components/AuthApp'
import { auth } from 'actions/douban'
import { clean } from 'actions/auth'
import shortid from 'utils/shortid'
import BindingSection from './BindingSection'
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
    <BindingSection
      authError={authError}
      authed={authed}
      username={username}
      password={password}
      onUsernameChange={onUsernameChange}
      onPasswordChange={onPasswordChange}
      onLogin={onLogin}
      onLogout={onLogout}
    />
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
)

export default enhancer(DoubanApp)
