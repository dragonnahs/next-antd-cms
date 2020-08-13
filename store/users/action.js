import { USERSET } from './type'


export const setUserInfo = (userInfo) => {
  return (dispatch) => {
    dispatch({
      type: USERSET,
      userInfo
    })
  }
}