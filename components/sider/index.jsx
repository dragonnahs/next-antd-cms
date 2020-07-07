import React, {Component} from 'react'
import { Menu } from 'antd'
import { AreaChartOutlined, PieChartOutlined, LineChartOutlined,TeamOutlined,FileOutlined,AimOutlined,
  SlidersFilled } from '@ant-design/icons';
import {withRouter} from 'next/router'
import {connect} from 'react-redux'
import {addTag} from '../../store/tags/action'
const {SubMenu} = Menu

class LeftSide extends Component{
  constructor(props){
    super(props)
    this.state = {
      defaultKey: '/cms/home',
    }
  }
  onSelect(target){
    const {router} = this.props
    if(target.key === router.pathname){
      return
    }
    this.props.addTag({
      pathname: target.key,
      name: target.item.node.innerText
    })
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
  componentWillReceiveProps(nextProps){
    this.setState({
      defaultKey: nextProps.router.pathname
    })
  }
  render() {
    return (
      <Menu
      selectedKeys={[this.state.defaultKey]}
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
        <Menu.Item key='/cms/skeleton'>
          <SlidersFilled />骨架屏
        </Menu.Item>
        <SubMenu title='图表' key='/echart' icon={<LineChartOutlined />}>
          <Menu.Item key='/cms/echarts/bar'>
            <AreaChartOutlined />柱状图
          </Menu.Item>
          <Menu.Item key='/cms/echarts/circle'>
            <PieChartOutlined />圆状图
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.tags
  }
}

export default connect(
  mapStateToProps,
  {
    addTag
  }
)(withRouter(LeftSide))