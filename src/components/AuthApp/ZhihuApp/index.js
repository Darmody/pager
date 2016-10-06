import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, withHandlers, lifecycle } from 'recompose'
import CSSModules from 'react-css-modules'
import AuthApp from 'components/AuthApp'
import { auth } from 'actions/zhihu'
import { clean } from 'actions/auth'
import shortid from 'utils/shortid'
import BindingSection from './BindingSection'
import styles from './styles.scss'
import icon from './zhihu.jpeg'

const ZhihuApp = ({
  authError, authed, needCaptcha,
  showingApp, showApp,
  appKey,
  username, password, onUsernameChange, onPasswordChange, onLogin, onLogout,
}) => (
  <AuthApp
    appName="Zhihu"
    appTheme="#1892f5"
    appIcon={icon}
    appKey={appKey}
    showApp={showApp}
    showingApp={showingApp}
    authed={authed}
  >
    <BindingSection
      authError={authError}
      needCaptcha={needCaptcha}
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
  setDisplayName('ZhihuApp'),
  connect(
    state => ({
      authError: state.auth.zhihu.error,
      authed: state.auth.zhihu.authed,
      needCaptcha: state.zhihu.needCaptcha,
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
    onLogout: props => () => props.clean('zhihu'),
  }),
  lifecycle({
    componentWillMount() {
      this.props.setAppKey(shortid())
    }
  }),
  CSSModules(styles),
)

export default enhancer(ZhihuApp)
