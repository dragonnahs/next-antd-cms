import React from 'react'
import App, {Container} from 'next/app'
import MContainer from '../components/continer'
import 'antd/dist/antd.css'

import '../static/style/style.css'


class MyApp extends App{
  
  renderContent = () => {
    const { Component, pageProps, router } = this.props
    if(router.pathname.match(/^\/cms/)) {
      return (
        <MContainer>
          <Component {...pageProps} />
        </MContainer>
      )
    }
    return (
      <Component {...pageProps} />
    )
  }
  render() {
    return (
      <Container>
        {
          this.renderContent()
        }
      </Container>
    )
  }
}

export default MyApp