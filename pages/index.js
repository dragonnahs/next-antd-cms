import Router from 'next/router'
import React, {useEffect} from 'react'

function Index(props) {
  useEffect(() => {
    Router.push('/cms/home')
  })
  return (<div></div>)
}

export default Index
