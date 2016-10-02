import React from 'react'
import _ from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ipcRenderer as ipc } from 'electron'
import { setDisplayName, lifecycle } from 'recompose'
import Content from 'components/Content'
import { store as storeAuth } from 'actions/auth'
import { statuses as doubanStatuses } from 'actions/douban'
import scheduler from 'utils/scheduler'
import 'normalize.css'
import 'styles/app.scss'

const App = () => (
  <div>
    <Content />
  </div>
)

const enhancer = _.compose(
  setDisplayName('App'),
  connect(
    state => ({
      doubanToken: state.auth.douban.token,
    }),
    dispatch => ({
      ...bindActionCreators({ storeAuth, doubanStatuses }, dispatch)
    })
  ),
  lifecycle({
    componentWillMount() {
      const { storeAuth } = this.props
      ipc.on('getAuthInfo:response', (_event, config) => config && storeAuth(config))
      ipc.send('getAuthInfo:request')

      this::scheduler()
    },
  }),
)

export default enhancer(App)
