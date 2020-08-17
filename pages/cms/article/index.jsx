import React from 'react'
import { Table, Tag } from 'antd'
import { withRouter } from 'next/router'
import AHeader from '../../../components/article/header'

import fetch from '@/util/fetch'

class Article extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      articleList: [],
      pageNum: 1,
      pageSize: 10,
      count: 0
    }
  }
  handleEdite = (target) => {
    const {router} = this.props
    if(target){
      router.push({
        pathname: '/cms/article/new_article',
        query: {
          articleId: target.id
        }
      })
    }else{
      router.push('/cms/article/new_article')
    }
  }
  columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center'
    },
    {
      title: '名称',
      dataIndex: 'articleName',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'categoryName'
    },
    {
      title: '描述',
      dataIndex: 'desc',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        return (
          <div>{value === 2 ? '已发布': '未发布'}</div>
        )
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'handle',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <Tag color='blue' onClick={this.handleEdite.bind(this, record)}>编辑</Tag>
            <Tag color='red'>删除</Tag>
          </>
        )
      }
    },
  ]
  async getArticleList(){
    let res = await fetch.post('/v1/h5/article/list', {
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    })
    if(res.code === 200){
      this.setState({
        articleList: res.data.list,
        count: res.data.count
      })
    }
  }
  changePageNum(target){
    this.setState({
      pageNum: target
    }, () => {
      this.getArticleList()
    })
  }
  componentDidMount(){
    this.getArticleList()
  }
  async searchFun(value){
    this.setState({
      pageNum: 1
    })
    if(!value){
      this.getArticleList()
    }else{
      let res = await fetch.post('/v1/h5/article/search', {
        content: value,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      })
      if(res.code === 200){
        this.setState({
          articleList: res.data.list,
          count: res.data.count
        })
      }
    }
  }
  
  render(){
    return(
      <div style={{padding: '10px'}}>
        <AHeader searchFun={this.searchFun.bind(this)} onClick={this.handleEdite}/>
        <Table 
        columns={this.columns}
        rowKey='id'
        dataSource={this.state.articleList}
        pagination={{
          defaultPageSize: 10,
          total: this.state.count,
          onChange: (target) => {
            this.changePageNum.call(this, target)
          }
        }}
        bordered></Table>
      </div>
    )
  }
}

export default withRouter(Article)