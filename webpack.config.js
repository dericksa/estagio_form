module.exports = {
  entry: './app/App.js',
  output: {
      path: __dirname + '/public',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}