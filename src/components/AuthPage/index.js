import React from 'react'
import _ from 'ramda'
import { setDisplayName, withState } from 'recompose'
import CSSModules from 'react-css-modules'
import DoubanApp from 'components/AuthApp/DoubanApp'
import styles from './styles.scss'

const AuthPage = ({
  showingApp, showApp,
}) => (
  <div styleName="auth-page">
    <DoubanApp showingApp={showingApp} showApp={showApp} />
    <DoubanApp showingApp={showingApp} showApp={showApp} />
  </div>
)

const enhancer = _.compose(
  setDisplayName('AuthPage'),
  withState('showingApp', 'showApp', null),
  CSSModules(styles),
)

export default enhancer(AuthPage)
