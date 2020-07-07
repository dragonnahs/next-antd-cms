import {withRouter} from 'next/router'
import {Tag} from 'antd'
import style from './index.scss'

function Dot(){
  return (
    <div className={style.dot}></div>
  )
}




function Tags(props){
  console.log(props);
  const {router} = props
  const {pathname} = router
  const tags = [
    {
      path: '/cms/home',
      name: '首页',
    },
    {
      path: '/cms/article',
      name: '文章',
    },
  ]
  return(
    <div className={style.tags}>
      {
        tags.map(tag => {
          return pathname === tag.path ? (
            <Tag key={tag.path} icon={<Dot/>} color="#42b983"
            closable={tag.path !=='/cms/home'}>{tag.name}</Tag>
          ):(
            <Tag key={tag.path} closable={tag.path !=='/cms/home'}>{tag.name}</Tag>
          )
        })
      }
    </div>
  )
}

export default withRouter(Tags)
