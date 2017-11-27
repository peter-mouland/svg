const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const marked = require('marked')
const renderer = new marked.Renderer()

const postCssPlugins = [cssnano({
  autoprefixer: {
    browsers: [
      'safari 9',
      'ie 10-11',
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'edge 13',
      'ios_saf 9.0-9.2',
      'ie_mob 11',
      'Android >= 4'
    ],
    cascade: false,
    add: true,
    remove: true
  },
  safe: true
})]

module.exports = {
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: { plugins: postCssPlugins } },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.svg$/,
        include: [/packages/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {
            pedantic: true,
            renderer
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url-loader?mimetype=application/font-woff']
      },
      {
        test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/[name].css')
  ]
}
