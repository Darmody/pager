import React from 'react'
import _ from 'ramda'
import { setDisplayName, withState } from 'recompose'
import CSSModules from 'react-css-modules'
import DoubanApp from 'components/AuthApp/DoubanApp'
import GithubApp from 'components/AuthApp/GithubApp'
import TwitterApp from 'components/AuthApp/TwitterApp'
import ZhihuApp from 'components/AuthApp/ZhihuApp'
import styles from './styles.scss'

const AuthPage = ({
  showingApp, showApp,
}) => (
  <div styleName="auth-page">
    <ZhihuApp showingApp={showingApp} showApp={showApp} />
    <TwitterApp showingApp={showingApp} showApp={showApp} />
    <DoubanApp showingApp={showingApp} showApp={showApp} />
    <GithubApp showingApp={showingApp} showApp={showApp} />
  </div>
)

const enhancer = _.compose(
  setDisplayName('AuthPage'),
  withState('showingApp', 'showApp', null),
  CSSModules(styles),
)

export default enhancer(AuthPage)
