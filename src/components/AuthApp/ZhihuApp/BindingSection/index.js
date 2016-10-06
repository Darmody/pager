import React from 'react'
import _ from 'ramda'
import { setDisplayName } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './styles.scss'

const BindingSection = ({
  authError,
  authed,
  needCaptcha,
  username, password, onUsernameChange, onPasswordChange, onLogin, onLogout,
}) => (
  <form styleName="binding-section">
    { authError && (<div styleName="error-message">账号绑定出错啦</div>) }
    { needCaptcha && (<div styleName="error-message">你最近操作太频繁啦，先休息一下</div>) }
    {
      !authed && (
        <div styleName="login-section">
          <input
            type="text"
            name="username"
            styleName="binding-input"
            value={username}
            placeholder="用户名"
            onChange={onUsernameChange}
          />
          <input
            type="password"
            name="password"
            styleName="binding-input"
            value={password}
            placeholder="密码"
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
)

const enhancer = _.compose(
  setDisplayName('BindingSection'),
  CSSModules(styles),
)

export default enhancer(BindingSection)
