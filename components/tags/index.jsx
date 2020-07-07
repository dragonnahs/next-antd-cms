import {withRouter} from 'next/router'
import {Tag} from 'antd'
import style from './index.scss'
import {connect} from 'react-redux'
import {deleteTag} from '../../store/tags/action'

function Dot(){
  return (
    <div className={style.dot}></div>
  )
}


function Tags(props){
  const {router, tags} = props
  const {pathname} = router
  function handleCloseTag (target){
    const targetIndex = tags.findIndex(tag => {return tag.pathname === target.pathname})
    
    console.log(tags,targetIndex);
    if(targetIndex === tags.length - 1){
      router.push({
        pathname: tags[tags.length - 2].pathname
      })
    }
    props.deleteTag(target)
  }
  function handleToggle(target){
    console.log(target);
    router.push({
      pathname: target.pathname
    })
  }
  return(
    <div className={style.tags}>
      {
        tags.map(tag => {
          return pathname === tag.pathname ? (
            <Tag className={style.tag} key={tag.pathname} icon={<Dot/>} color="#42b983"
            closable={tag.pathname !=='/cms/home'}
            onClose={handleCloseTag.bind(this, tag)}
            onClick={handleToggle.bind(this,tag)}>{tag.name}</Tag>
          ):(
            <Tag className={style.tag} key={tag.pathname} closable={tag.pathname !=='/cms/home'}
            onClose={handleCloseTag.bind(this, tag)}
            onClick={handleToggle.bind(this, tag)}>{tag.name}</Tag>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.tags
  }
}

export default connect(mapStateToProps, {
  deleteTag
})(withRouter(Tags))
