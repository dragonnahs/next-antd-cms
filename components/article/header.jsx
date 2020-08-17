
import { Row, Col, Button, Input } from 'antd'

const { Search } = Input
const AHeader = (props) => {
  return(
    <div style={{marginBottom:'10px'}}>
      <Row
      align='space-between'>
        <Col>
          <Button type='primary'
          onClick={() => {
            props.onClick()
          }}>新增</Button>
        </Col>
        <Col>
          <Search placeholder='输入搜索内容'
          onSearch={props.searchFun}
          enterButton/>
        </Col>
      </Row>
    </div>
  )
}

export default AHeader