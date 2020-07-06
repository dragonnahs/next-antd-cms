import React from 'react'
import {withRouter} from 'next/router'
import cookie from 'js-cookie'
import LeftSide from '../sider'
import MineHeader from '../header'
import {Layout} from 'antd'
const { Content, Header, Sider } = Layout


class MContainer extends React.Component{
  renderAuthor() {
    const {children, router} = this.props
    if(process.browser && !cookie.get('user')) {
      console.log(router);
      router.push({
        pathname: '/login',
        query: {
          from: router.pathname
        }
      })
      return (<div></div>)
    }
    return (<div>
      <Layout>
        <Header style={{height: '8vh'}}>
          <MineHeader></MineHeader>
        </Header>
        <Layout style={{height: '92vh'}}>
          <Sider width={160}>
            <LeftSide></LeftSide>
          </Sider>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>)
  }
  render(){
    return this.renderAuthor()
  }
}

export default withRouter(MContainer)