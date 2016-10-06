import { combineReducers } from 'redux'
import auth from './auth'
import zhihu from './zhihu'

const rootReducer = combineReducers({
  auth,
  zhihu,
})

export default rootReducer
