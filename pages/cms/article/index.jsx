import {Table, Tag} from 'antd'


const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '作者',
    dataIndex: 'author'
  },
  {
    title: '标签',
    dataIndex: 'tag'
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
          <Tag color='blue'>编辑</Tag>
          <Tag color='red'>删除</Tag>
        </>
      )
    }
  },
]
const data = [
  {
    key: 1,
    name: '盘龙',
    author: '西红柿',
    tag: '玄幻',
    nums: 1025
  },
  {
    key: 2,
    name: '雪鹰领主',
    author: '西红柿',
    tag: '玄幻',
    nums: 2158
  },
]
const Article = () => {
  return(
    <div style={{padding: '10px'}}>
      <Table 
      columns={columns}
      dataSource={data}
      bordered></Table>

    </div>
  )
}

export default Article