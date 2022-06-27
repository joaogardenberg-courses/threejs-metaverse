const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { filename: 'bundle.js' },
  devServer: {
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.c|(s[ac])ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
