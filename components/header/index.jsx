import React, { Component } from 'react';
import {withRouter} from 'next/router'
import cookie from 'js-cookie'

import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, WindowsOutlined } from '@ant-design/icons';

let router;
function handleClick(e){
  console.log(e);
  if (e.key === 'logout') {
    router.push({
      pathname: '/login',
      query: {
        from: router.pathname
      }
    })
    cookie.remove('user')
  }
}
const menu = (
  <Menu
  onClick={handleClick}>
    <Menu.Item>
      个人中心
    </Menu.Item>
    <Menu.Item>
      修改内容
    </Menu.Item>
    <Menu.Item key='logout'>
      退出
    </Menu.Item>
  </Menu>
)

class MineHeader extends Component {
  
  render() {
    router = this.props.router
    return (
      <div style={{width: '100%',height: '100%',display: 'flex',alignItems:'center',justifyContent: 'space-between'}}>
        <WindowsOutlined style={{ fontSize: '40px', color: '#ffffff' }} />
        <Dropdown overlay={menu}>
          <Avatar style={{cursor: 'pointer'}} size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(MineHeader)