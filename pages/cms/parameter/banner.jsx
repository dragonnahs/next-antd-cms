import React, { useState, useEffect } from 'react'
import { Table, Tag, message } from 'antd'
import EModel from '@/components/parameter/modal'
import EHeader from '@/components/parameter/header'

import style from './banner.scss'
import fetch from '@/util/fetch'



function Banner(props){
  const [ list, setList ] = useState(props.list)
  const [ pageNum, setPageNum ] = useState(1)
  const [ visible, setVisible ] = useState(false)
  const [ bannerInfo, setBannerInfo ] = useState({})
  const [ count, setCount ] = useState(0)
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type'
    },
    {
      title: '页面地址',
      dataIndex: 'url',
      align: 'center'
    },
    {
      title: '文章id',
      dataIndex: 'articleId',
      align: 'center'
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      align: 'center'
    },
    {
      title: '权重',
      dataIndex: 'power'
    },
    {
      title: '操作',
      dataIndex: 'handle',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <Tag color='blue' onClick={handleEdite.bind(this, record)}>编辑</Tag>
            <Tag color='red'>删除</Tag>
          </>
        )
      }
    },
  ]
  useEffect(() => {
    // getList()
  }, [])
  function handleEdite(target){
    setVisible(true)
    setBannerInfo(target)
  }
  async function getList(){
    let res = await fetch.post('/v1/h5/banner/list', {
      pageNum: pageNum,
      pageSize: 10
    })
    if(res.code === 200){
      setList(res.data.list)
      setCount(res.data.count)
    }
  }
  async function handleOk(target, id){
    let res = await fetch.post('/v1/h5/banner/save', {
      ...target.getFieldValue(),
      id
    })
    if(res.code === 200){
      target.resetFields()
      setVisible(false)
      message.success('保存成功')
      setPageNum(1)
      getList()
    }
  }
  return (
    <div className={style.banner}>
      <EHeader onClick={handleEdite}/>
      <Table 
        columns={columns}
        rowKey='id'
        dataSource={list}
        total={count}
        pagination={{
          defaultPageSize: 10,
          total: 1,
          onChange: (target) => {
            this.changePageNum.call(this, target)
          }
        }}
        bordered></Table>
      {
        (visible?(
          <EModel
          handleCancel={() => {
            setVisible(false)
          }}
          visible={visible}
          bannerInfo={bannerInfo}
          handleOk={handleOk}/>
        ):(''))
      }
      
    </div>
  )
}

Banner.getInitialProps = async function(){
  let res = await fetch.post('/v1/h5/banner/list', {
    pageNum: 1,
    pageSize: 10
  })
  return {
    list: res.data.list
  }
}


export default Banner