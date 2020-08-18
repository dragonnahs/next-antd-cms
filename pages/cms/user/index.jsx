import React, { useState, useEffect } from 'react'
import {Table, Tag, message} from 'antd'
import fetch from '@/util/fetch'


function handleEditor(){
  message.info('功能待更新')
}

const columns = [
  {
    title: '序号',
    dataIndex: 'rank'
  },
  {
    title: '用户名',
    dataIndex: 'name'
  },
  {
    title: '权限',
    dataIndex: 'roleName'
  },
  {
    title: '操作',
    dataIndex: 'handle',
    align: 'center',
    render: () => {
      return (
        <>
          <Tag color='blue' onClick={handleEditor}>编辑</Tag>
          <Tag color='red'>删除</Tag>
        </>
      )
    }
  },
]
const data = [
  {
    key: 1,
    name: '小明',
    power: 'admin'
  },
  {
    key: 2,
    name: '李华',
    power: 'editor'
  },
  {
    key: 3,
    name: '小白',
    power: 'visitor'
  }
]

const User = () => {
  const [ list, setList ] = useState([])
  useEffect(() => {
    async function handleSetList(){
      const res = await fetch.post('/v1/h5/adminUser/list')
      setList(res.data.list)
    }
    handleSetList()
  }, [])
  return(
    <div style={{padding: '10px'}}>
      <Table 
      columns={columns}
      dataSource={list}
      rowKey='id'
      bordered
      pagination={false}></Table>

    </div>
  )
}

export default User