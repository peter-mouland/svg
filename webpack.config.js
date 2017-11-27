const webpack = require('webpack')
const path = require('path')
const ROOT = path.join(process.cwd())
const PACKAGE = path.join(ROOT, 'esnext')

module.exports = {
  context: ROOT,
  externals: { react: true },
  entry: { 'dist/Svg': `${PACKAGE}/Svg.jsx` },
  output: {
    path: ROOT,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [/esnext/],
      },
      {
        test: /\.svg$/,
        include: [/esnext/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=../../fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
  },
}
