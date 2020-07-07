import {ADDTAG,DELETETAG} from './type'

export const addTag = (tag) => {
  return (dispatch) => {
    dispatch({
      type: ADDTAG,
      tag
    })
  }
}
export const deleteTag = (tag) => {
  return (dispatch) => {
    dispatch({
      type: DELETETAG,
      tag
    })
  }
}