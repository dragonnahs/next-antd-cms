import axios from 'axios'
import Router from 'next/router'

const idProd = process.env.NODE_ENV === 'production'
let instance = axios.create({
  baseURL: idProd ? '/' : '/',
  timeout: 1000,
})

instance.interceptors.request.use(function(config){

  return config
}, function(error){
  return Promise.reject(error)
})

instance.interceptors.response.use(function(response){
  let res = response.data
  if(res.code === 200){
    return res
  }else if(res.code === 401){
    Router.push({
      pathname: '/login',
      query: {
        from: Router.router.pathname
      }
    })
    return res
  }else{
    return res
  }
}, function(error){
  return Promise.reject(error)
})


export default instance