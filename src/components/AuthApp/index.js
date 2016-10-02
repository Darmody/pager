import React from 'react'
import { presets } from 'react-motion'
import Collapse from 'react-collapse'
import _ from 'ramda'
import { setDisplayName, withHandlers } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './styles.scss'

const AuthApp = ({
  appTheme, appIcon, appKey, authed,
  children,
  showingApp, onClick
}) => (
  <div styleName="auth-app" >
    <div
      styleName="app-info"
      style={{ backgroundColor: appTheme }}
      className={(authed || showingApp === appKey) ? '' : 'unauth'}
      onClick={onClick}
    >
      <img
        src={appIcon}
        role="presentation"
        styleName="app-icon"
      />
    </div>
    <Collapse
      isOpened={showingApp === appKey}
      springConfig={presets.gentle}
      fixedHeight={authed ? 100 : 180}
    >
      {children}
    </Collapse>
  </div>
)

const enhancer = _.compose(
  setDisplayName('AuthApp'),
  withHandlers({
    onClick: props => () => {
      props.showApp(props.appKey !== props.showingApp ? props.appKey : null)
    }
  }),
  CSSModules(styles),
)

export default enhancer(AuthApp)
