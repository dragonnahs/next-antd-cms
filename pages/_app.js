import React from 'react'
import App, {Container} from 'next/app'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import MContainer from '../components/continer'
import 'antd/dist/antd.css'
import '../static/style/style.css'
import createStore from '../store/index'



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
    const { persistor, store } = createStore()
    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {
              this.renderContent()
            }
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default MyApp