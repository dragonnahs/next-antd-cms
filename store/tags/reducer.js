import {ADDTAG,DELETETAG} from './type'

const defatulState = {
  tags: [
    {
      pathname: '/cms/home',
      name: '首页',
    }
  ]
}

export default (state = defatulState, action) => {
  let newTags;
  let newState
  switch(action.type){
    case ADDTAG:
      newState = {...state}
      const flag = newState.tags.some(item => {
        return item.pathname === action.tag.pathname
      })
      if(!flag){
        newState.tags.push(action.tag)
      }
      return newState;
    case DELETETAG:
      newState = {...state}
      newTags = newState.tags.filter(tag => {
        return tag.pathname !== action.tag.pathname
      })
      newState.tags = newTags
      console.log(newState,action.tag)
      return newState;
    default:
      return state;
  }
}