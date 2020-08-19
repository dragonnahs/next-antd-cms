import React, {Component} from 'react'
import { Menu } from 'antd'
import { AreaChartOutlined, PieChartOutlined, LineChartOutlined,TeamOutlined,FileOutlined,AimOutlined,
  SlidersFilled, UnorderedListOutlined, FormOutlined } from '@ant-design/icons';
import {withRouter} from 'next/router'
import {connect} from 'react-redux'
import {addTag} from '../../store/tags/action'
const {SubMenu} = Menu


const list = [
  {
    name: '首页',
    icon: <AimOutlined />,
    key: '/cms/home'
  },
  {
    name: '文章',
    icon: <FileOutlined />,
    key: '/cms/article'
  },
  {
    name: '用户',
    icon: <TeamOutlined />,
    key: '/cms/user',
    permission: 1
  },
  {
    name: '运营配置',
    icon: <UnorderedListOutlined />,
    key: '/parameter',
    list: [
      {
        name: 'banner参数配置',
        icon: <FormOutlined />,
        key: '/cms/parameter/banner'
      }
    ]
  },
  {
    name: '骨架屏',
    icon: <SlidersFilled />,
    key: '/cms/skeleton'
  },
  {
    name: '图表',
    icon: <LineChartOutlined />,
    key: '/echart',
    list: [
      {
        name: '柱状图',
        icon: <AreaChartOutlined />,
        key: '/cms/echarts/bar'
      },
      {
        name: '圆状图',
        icon: <PieChartOutlined />,
        key: '/cms/echarts/circle'
      }
    ]
  },
]
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
  renderList(list){
    const { userInfo } = this.props
    return list.map(item => {
      if(item.permission && userInfo.permission > item.permission){
        return
      }
      if(Array.isArray(item.list) && item.list.length > 0){
        return (
          <SubMenu title={item.name} key={item.key} icon={item.icon}>
            {
              this.renderList(item.list)
            }
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.key}>
            {item.icon}{item.name}
          </Menu.Item>
        )
      }
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
        {
          this.renderList(list)
        }
      </Menu>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.tags,
    ...state.users
  }
}

export default connect(
  mapStateToProps,
  {
    addTag
  }
)(withRouter(LeftSide))