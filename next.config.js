const path = require('path')
const withCss = require('@zeit/next-css')
const withPlugin = require('next-compose-plugins')

if(typeof require !== 'undefined'){
  require.extensions['.css'] = file => {}
}


module.exports = withPlugin([
  withCss({}),
  {
    sassOptions: {
      includesPaths: [path.join(__dirname, 'pages')]
    }
  }
])