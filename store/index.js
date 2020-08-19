import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import tags from './tags/reducer'
import users from './users/reducer'

const reducers = combineReducers({
  tags,
  users
})


export default createStore(reducers, applyMiddleware(thunk))