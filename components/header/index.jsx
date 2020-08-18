import React, { Component } from 'react';
import {withRouter} from 'next/router'
import { connect } from 'react-redux'
import fetch from '@/util/fetch.js'
import {setUserInfo} from '../../store/users/action'

import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, WindowsOutlined } from '@ant-design/icons';

let router;
function handleClick(e){
  console.log(e);
  if (e.key === 'logout') {
    fetch.post('/v1/h5/adminUser/logout')
    router.push({
      pathname: '/login',
      query: {
        from: router.pathname
      }
    })
  }
}
const menu = (userInfo) => {
  return (
    <Menu
    onClick={handleClick}>
      <Menu.Item>
        {userInfo.name}
      </Menu.Item>
      <Menu.Item>
        修改内容
      </Menu.Item>
      <Menu.Item key='logout'>
        退出
      </Menu.Item>
    </Menu>
  )
}

class MineHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: {}
    }
  }
  async componentDidMount(){
    let res = await fetch.get('/v1/h5/adminUser/userInfo')
    if(res.code === 200){
      this.setState({userInfo: res.data.userInfo}, () => {
        this.props.setUserInfo(this.state.userInfo)
      })
      
    }
  }
  render() {
    router = this.props.router
    return (
      <div style={{width: '100%',height: '100%',display: 'flex',alignItems:'center',justifyContent: 'space-between'}}>
        <WindowsOutlined style={{ fontSize: '40px', color: '#ffffff' }} />
        <Dropdown overlay={menu(this.state.userInfo)}>
          <div style={{display: 'flex', alignItems: 'center', boxSizing: 'border-box'}}>
            <Avatar style={{cursor: 'pointer'}} size={40} src={this.state.userInfo.avatarUrl} icon={<UserOutlined />} />
            <div style={{color: '#ffffff',marginLeft: '10px'}}>{this.state.userInfo.roleName}</div>
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    ...state.users
  }
}, {
  setUserInfo
})(withRouter(MineHeader))