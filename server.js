const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const {createProxyMiddleware} = require('http-proxy-middleware')

const devProxy = {
  '/v1': {
      target: 'http://localhost:3000', // 端口自己配置合适的
      // pathRewrite: {
      //     '^/v1': '/'
      // },
      changeOrigin: true
  }
}

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 5000
const app = next({dev})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    if(dev && devProxy){
      Object.keys(devProxy).forEach(function(context){
        server.use(createProxyMiddleware(context, devProxy[context]))
      })
    }
    
    server.use(cookieParser())

    server.get('/cms/*', (req, res) => {
      // if(!req.cookies.uid){
      //   res.redirect(`/login?from=${encodeURIComponent(req.url)}`)
      // }
      return handle(req, res)
    })
    
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    
    server.listen(port, err => {
      if(err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })