import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import tags from './tags/reducer'

const reducers = combineReducers({
  tags
})

export default createStore(reducers, applyMiddleware(thunk))