import { USERSET } from './type'

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  let newState;
  switch(action.type){
    case USERSET:
      newState = {...state}
      newState.userInfo = action.userInfo
      return newState
    default:
      return state
  }
}