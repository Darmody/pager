import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, withHandlers, lifecycle } from 'recompose'
import CSSModules from 'react-css-modules'
import AuthApp from 'components/AuthApp'
import { auth } from 'actions/douban'
import shortid from 'utils/shortid'
import styles from './styles.scss'
import icon from './zhihu.jpeg'

const ZhihuApp = ({
  authError,
  showingApp, showApp,
  appKey,
  username, password, onUsernameChange, onPasswordChange, onSubmit,
}) => (
  <AuthApp
    appName="Zhihu"
    appTheme="#1892f5"
    appIcon={icon}
    appKey={appKey}
    showApp={showApp}
    showingApp={showingApp}
  >
    <form styleName="binding-section">
      { authError && (<div>账号绑定出错啦</div>) }
      <input
        type="text" name="username" value={username} onChange={onUsernameChange}
      />
      <input
        type="password" name="password" value={password} onChange={onPasswordChange}
      />
      <button type="button" onClick={onSubmit} />
    </form>
  </AuthApp>
)

const enhancer = _.compose(
  setDisplayName('ZhihuApp'),
  connect(
    state => ({
      authError: state.auth.zhihu.error,
    }),
    dispatch => ({
      ...bindActionCreators({ auth }, dispatch)
    })
  ),
  withState('appKey', 'setAppKey', null),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onUsernameChange: props => event => props.setUsername(event.target.value),
    onPasswordChange: props => event => props.setPassword(event.target.value),
    onSubmit: props => () => props.auth(props.username, props.password),
  }),
  lifecycle({
    componentWillMount() {
      this.props.setAppKey(shortid())
    }
  }),
  CSSModules(styles),
)

export default enhancer(ZhihuApp)
