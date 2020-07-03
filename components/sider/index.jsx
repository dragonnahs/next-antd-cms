import React, {Component} from 'react'
import { Menu } from 'antd'
import { AreaChartOutlined, PieChartOutlined, LineChartOutlined,TeamOutlined,FileOutlined,AimOutlined } from '@ant-design/icons';
import {withRouter} from 'next/router'
const {SubMenu} = Menu

class LeftSide extends Component{
  constructor(props){
    super(props)
    this.state = {
      defaultKey: '/cms/home'
    }
  }
  onSelect(target){
    console.log(target);
    const {router} = this.props
    router.push({
      pathname: target.key
    })
  }
  componentWillMount(){
    const {pathname} = this.props.router
    this.setState({
      defaultKey: pathname
    })
  }
  render() {
    return (
      <Menu defaultSelectedKeys={[this.state.defaultKey]}
      theme='light'
      mode='inline'
      style={{height: '100%'}}
      onSelect={this.onSelect.bind(this)}>
        <Menu.Item key='/cms/home'>
          <AimOutlined />首页
        </Menu.Item>
        <Menu.Item key='/cms/article'>
          <FileOutlined />文章
        </Menu.Item>
        <Menu.Item key='/cms/user'>
          <TeamOutlined />用户
        </Menu.Item>
        <SubMenu title='图表' key='/echart' icon={<LineChartOutlined />}>
          <Menu.Item key='/cms/zhu'>
            <AreaChartOutlined />柱状图
          </Menu.Item>
          <Menu.Item key='/cms/echarts_circle'>
            <PieChartOutlined />圆状图
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(LeftSide)