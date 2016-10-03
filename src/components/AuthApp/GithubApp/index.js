import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, withHandlers, lifecycle } from 'recompose'
import CSSModules from 'react-css-modules'
import AuthApp from 'components/AuthApp'
import { auth } from 'actions/github'
import { clean } from 'actions/auth'
import shortid from 'utils/shortid'
import BindingSection from './BindingSection'
import styles from './styles.scss'
import icon from './github.png'

const GithubApp = ({
  authError, authed, inputUsername,
  showingApp, showApp,
  appKey,
  onUsernameChange, onLogin, onLogout,
}) => (
  <AuthApp
    appName="Github"
    appTheme="black"
    appIcon={icon}
    appKey={appKey}
    authed={authed}
    showApp={showApp}
    showingApp={showingApp}
    bindingSectionHeightInAuthed={130}
  >
    <BindingSection
      authError={authError}
      authed={authed}
      username={inputUsername}
      onUsernameChange={onUsernameChange}
      onLogin={onLogin}
      onLogout={onLogout}
    />
  </AuthApp>
)

const enhancer = _.compose(
  setDisplayName('GithubApp'),
  connect(
    state => ({
      authError: state.auth.github.error,
      authed: state.auth.github.authed,
      username: state.auth.github.username,
    }),
    dispatch => ({
      ...bindActionCreators({ auth, clean }, dispatch)
    })
  ),
  withState('appKey', 'setAppKey', null),
  withState('inputUsername', 'setUsername', ''),
  withHandlers({
    onUsernameChange: props => event => props.setUsername(event.target.value),
    onLogin: props => () => props.auth(props.inputUsername),
    onLogout: props => () => props.clean('github'),
  }),
  lifecycle({
    componentWillMount() {
      this.props.setAppKey(shortid())
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.username !== nextProps.username) {
        this.props.setUsername(nextProps.username)
      }
    },
  }),
  CSSModules(styles),
)

export default enhancer(GithubApp)
