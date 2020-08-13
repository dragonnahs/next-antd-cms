import React from 'react'
import {withRouter} from 'next/router'
import cookie from 'js-cookie'
import LeftSide from '../sider'
import MineHeader from '../header'
import Tags from '../tags'
import {Layout} from 'antd'
const { Content, Header, Sider } = Layout


class MContainer extends React.Component{
  renderAuthor() {
    const {children} = this.props
    return (<div>
      <Layout>
        <Header style={{height: '8vh'}}>
          <MineHeader></MineHeader>
        </Header>
        <Layout style={{height: '92vh'}}>
          <Sider width={160}>
            <LeftSide></LeftSide>
          </Sider>
          <Content>
            <Tags/>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>)
  }
  render(){
    return this.renderAuthor()
  }
}

export default withRouter(MContainer)