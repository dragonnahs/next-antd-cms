import React from 'react'
import {Skeleton,List} from 'antd'


const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
function delay(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(11)
    }, 3000)
  })
}
class SkeletonBox extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      loading: true
    }
  }
  async componentDidMount(){
    let res = await delay()
    console.log(res, 'aa');
    this.setState({
      loading: false
    })
  }
  componentWillUnmount(){
    this.setState = () => {
      return
    }
  }
  render(){
    return (
      <div style={{background: '#ffffff',margin: '20px',padding: '20px'}}>
        <Skeleton active
        loading={this.state.loading}>
          <div>
            <List
              size="small"
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        </Skeleton>
      </div>
    )
  }
}

export default SkeletonBox