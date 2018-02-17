const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: {
    'dist/Svg': './esnext/Svg.jsx'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
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
    ]
  },
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
  },
}
