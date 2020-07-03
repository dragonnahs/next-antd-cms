const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({dev})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())

    server.get('/cms/*', (req, res) => {
      if(!req.cookies.user){
        res.redirect(`/login?from=${encodeURIComponent(req.url)}`)
      }
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