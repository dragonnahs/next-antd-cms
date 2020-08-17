import React from 'react'
import style from './new_article.scss'
import { Input, Select, Button, message } from 'antd'
import dynamic from 'next/dynamic'
import fetch from '@/util/fetch.js'
import { withRouter } from 'next/router'

const { Option } = Select
const { TextArea } = Input

const DynamicEditor = dynamic(
  import('@/components/editor'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)

class newArticle extends React.Component{
  state = {
    content: '',
    name: '',
    desc: '',
    status: 2,
    categoryId: 1,
    categoryList: [],
    articleId: '',
  }
  handleChangeContent(value){
    this.setState({
      content: value
    })
  }
  async getCategoryList(){
    let res = await fetch.post('/v1/h5/category/list')
    console.log(res);
    if(res.code === 200){
      this.setState({
        categoryList: res.data.list
      })
    }
  }
  async getArticleInfo(){
    let res = await fetch.post('/v1/h5/article/info', {
      articleId: this.state.articleId
    })
    if(res.code === 200){
      this.setState({
        content: res.data.info.content,
        desc: res.data.info.description,
        status: res.data.info.articleStatus,
        categoryId: res.data.info.categoryId,
        name: res.data.info.name
      })
      console.log(this.state);
    }
  }
  async componentWillMount(){
    console.log(1111,4444);
    await this.getCategoryList()
    this.setState({
      articleId: parseInt(this.props.router.query.articleId)
    }, () => {
      if(this.state.articleId){
        this.getArticleInfo()
      }
    })
    
    
  }
  publishStatusFun(target){
    this.setState({
      status: target
    })
  }
  selectCategoryFun(target){
    this.setState({
      categoryId: target
    })
  }
  async publish(){
    if(this.state.content && this.state.name && this.state.categoryId > 0){
      let res = await fetch.post('/v1/h5/article/save', {
        name: this.state.name,
        content: this.state.content,
        desc: this.state.desc,
        categoryId: this.state.categoryId,
        status: this.state.status,
        articleId: this.state.articleId
      })
      if(res.code === 200){
        this.props.router.push('/cms/article')
      }else{
        message.warning(res.msg || '请求失败')
      }
    }
  }
  changeNameFun(e){
    this.setState({
      name: e.target.value
    })
  }
  changeDescFun(e){
    this.setState({
      desc: e.target.value
    })
  }
  render(){
    return (
      <div className={style.article}>
        <div className={style.title}>
          <Input value={this.state.name} onChange={this.changeNameFun.bind(this)} placeholder='请输入标题'/>
        </div>
        <div className={style.status}>
          <Select placeholder='文章状态'
          value={this.state.status}
          onSelect={this.publishStatusFun.bind(this)}>
            <Option value={1} key='1'>已发布</Option>
            <Option value={2} key='2'>未发布</Option>
          </Select>
          <Select
          className={style.category}
          placeholder='文章分类'
          value={this.state.categoryId}
          onSelect={this.selectCategoryFun.bind(this)}>
            {
              this.state.categoryList.map(item => {
                return (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </div>
        <div className={style.desc}>
          <TextArea 
          placeholder='请输入描述内容'
          allowClear='true'
          value={this.state.desc}
          onChange={this.changeDescFun.bind(this)}
          />
        </div>
        <div className={style.content}>
          {
            ((this.articleId && this.state.content) || !this.articleId) ? <DynamicEditor content={this.state.content} handleChangeContent={this.handleChangeContent.bind(this)} /> : <div></div>
          }
        </div>
        <div className={style.handle}>
          <Button 
          type='primary'
          onClick={this.publish.bind(this)}>发布</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(newArticle)