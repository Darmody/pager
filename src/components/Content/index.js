import React from 'react'
import _ from 'ramda'
import setDisplayName from 'recompose/setDisplayName'
import CSSModules from 'react-css-modules'
import AuthPage from 'components/AuthPage'
import styles from './styles.scss'

const Content = () => (
  <div styleName="content">
    <AuthPage />
  </div>
)

const enhancer = _.compose(
  setDisplayName('Content'),
  CSSModules(styles),
)

export default enhancer(Content)
