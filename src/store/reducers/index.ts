import { combineReducers } from 'redux'
import { USER_LOGOUT } from '../actions/users'

import user from './user'
import months from './month'

const appReducer = combineReducers({
  user,
  months,
})

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
