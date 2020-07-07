const path = require('path')
const withCss = require('@zeit/next-css')
const withPlugin = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')


module.exports = withPlugin([
  withSass({
    cssModules: true,
    ...withCss()
  }),
  {
    sassOptions: {
      includePaths: [path.join(__dirname, 'pages')],
    },
    devIndicators: {
      autoPrerender: false,
    }
  }
])