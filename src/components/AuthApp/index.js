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
  bindingSectionHeightInAuthed = 100,
  bindingSectionHeightInUnauthed = 200,
  showingApp, onClick, appRef,
}) => (
  <div styleName="auth-app" ref={appRef}>
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
      fixedHeight={
        authed ? bindingSectionHeightInAuthed : bindingSectionHeightInUnauthed}
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
    },
    appRef: () => (ref) => {
      ref.addEventListener('click', ref.scrollIntoViewIfNeeded)
    }
  }),
  CSSModules(styles),
)

export default enhancer(AuthApp)
