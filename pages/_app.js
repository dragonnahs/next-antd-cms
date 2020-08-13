import React from 'react'
import App, {Container} from 'next/app'
import {Provider} from 'react-redux'

import MContainer from '../components/continer'
import 'antd/dist/antd.css'
import '../static/style/style.css'
import store from '../store/index'



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
        <Provider store={store}>
          {
            this.renderContent()
          }
        </Provider>
      </Container>
    )
  }
}

export default MyApp