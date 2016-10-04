import React from 'react'
import { connect } from 'react-redux'
import _ from 'ramda'
import { setDisplayName, withState, lifecycle } from 'recompose'
import CSSModules from 'react-css-modules'
import checkmark from './checkmark.gif'
import loading from './loading.gif'
import styles from './styles.scss'

let animatedTimer = null

const Footer = ({
  authStatus,
}) => (
  <div styleName="footer">
    <div styleName="spinner-panel">
      { authStatus === 'success' && (
        <img styleName="spinner" src={checkmark} role="presentation" />
      )}
      { authStatus === 'failed' && (
        <img styleName="spinner" src={checkmark} role="presentation" />
      )}
      { authStatus === 'started' && (
        <img styleName="spinner" src={loading} role="presentation" />
      )}
      { authStatus === 'pending' && (
        <a href="mailto:eterlf41@gmail.com" styleName="text-section">
          <p>想要更多</p>
          <p>APP</p>
        </a>
      )}
    </div>
  </div>
)

const authStarted = (props, nextProps) =>
  props.status !== 'started' && nextProps.status === 'started'

const authSuccess = (props, nextProps) =>
  props.status === 'started' && nextProps.status === 'success'

const authFailed = (props, nextProps) =>
  props.status === 'started' && nextProps.status === 'failed'

const updateAuthStatus = (props, status) => {
  window.clearTimeout(animatedTimer)
  props.setAnimated(false)
  props.setAuthStatus(status)
  animatedTimer = window.setTimeout(() => props.setAnimated(true), 2000)
}

const enhancer = _.compose(
  setDisplayName('Footer'),
  connect(
    state => ({
      status: state.auth.status,
    }),
  ),
  withState('authStatus', 'setAuthStatus', 'pending'),
  withState('animated', 'setAnimated', false),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (authStarted(this.props, nextProps)) {
        updateAuthStatus(nextProps, 'started')
      } else if (authSuccess(this.props, nextProps)) {
        updateAuthStatus(nextProps, 'success')
        window.setTimeout(() => nextProps.setAnimated(true), 2000)
      } else if (authFailed(this.props, nextProps)) {
        updateAuthStatus(nextProps, 'failed')
      } else if (nextProps.authStatus !== 'pending' && nextProps.animated) {
        this.props.setAuthStatus('pending')
      }
    }
  }),
  CSSModules(styles),
)

export default enhancer(Footer)
