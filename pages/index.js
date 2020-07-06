import Router from 'next/router'
import React from 'react'

class Index extends React.Component{
  componentDidMount(){
    Router.push({pathname: '/cms/home'})
  }
  render(){
    return (
      <div></div>
    )
  }
}

export default Index
