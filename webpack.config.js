var bufferify = require('webpack-bufferify')

module.exports = {
  mode: 'none',
  entry: __dirname + '/src/hello-async.js',
  output: {
    path: __dirname + '/dist',
    filename: 'hello-async.js',
    library: 'HelloAsync',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ]
  },
  plugins: [
    bufferify(function(content) {
      content = content.replace('__webpack_exports__["default"] = (HelloAsync);', 'module.exports = HelloAsync;')
      return content
    }),
  ],
}