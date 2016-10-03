import React from 'react'
import _ from 'ramda'
import { withHandlers, setDisplayName } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './styles.scss'

const BindingSection = ({
  authError,
  username, onUsernameChange, onConfirm,
}) => (
  <form styleName="binding-section">
    { authError && (<div styleName="error-message">账号绑定出错啦</div>) }
    <div styleName="login-section">
      <input
        type="text"
        name="username"
        styleName="binding-input"
        value={username}
        placeholder="Username"
        onChange={onUsernameChange}
      />
      <button
        type="button" onClick={onConfirm} styleName="login-button"
      >
        Confirm
      </button>
    </div>
  </form>
)

const enhancer = _.compose(
  setDisplayName('BindingSection'),
  withHandlers({
    onConfirm: props => () => {
      if (props.authed && !props.username) {
        props.onLogout()
      } else {
        props.onLogin()
      }
    }
  }),
  CSSModules(styles),
)

export default enhancer(BindingSection)
