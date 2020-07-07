import {Table, Tag, message} from 'antd'


function handleEditor(){
  message.info('功能待更新')
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'name'
  },
  {
    title: '权限',
    dataIndex: 'power'
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
  return(
    <div style={{padding: '10px'}}>
      <Table 
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}></Table>

    </div>
  )
}

export default User