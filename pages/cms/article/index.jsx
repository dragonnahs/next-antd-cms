import React from 'react'
import { Table, Tag } from 'antd'
import SModal from '../../../components/article/modal'
import AHeader from '../../../components/article/header'


const data = [
  {
    key: 1,
    name: '盘龙',
    author: '西红柿',
    category: '玄幻',
    nums: 1025
  },
  {
    key: 2,
    name: '雪鹰领主',
    author: '西红柿',
    category: '玄幻',
    nums: 2158
  },
]
class Article extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
    }
  }
  handleOk = (values) => {
    console.log(values);
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleEdite = () => {
    // if(this.refs.formRef){
    //   this.refs.formRef.resetFields()
    // }
    this.setState({
      visible: true,
    })
  }
  columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '分类',
      dataIndex: 'category'
    },
    {
      title: '阅读数',
      dataIndex: 'nums'
    },
    {
      title: '操作',
      dataIndex: 'handle',
      align: 'center',
      render: () => {
        return (
          <>
            <Tag color='blue' onClick={this.handleEdite}>编辑</Tag>
            <Tag color='red'>删除</Tag>
          </>
        )
      }
    },
  ]
  
  render(){
    return(
      <div style={{padding: '10px'}}>
        <AHeader onClick={this.handleEdite}/>
        <Table 
        columns={this.columns}
        dataSource={data}
        bordered></Table>
        <SModal 
        visible={this.state.visible}
        handleOk={this.handleOk}
        handleCancel={this.handleCancel}/>
      </div>
    )
  }
}

export default Article