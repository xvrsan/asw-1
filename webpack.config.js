var bufferify = require('webpack-bufferify')
var UMDPlugin = bufferify(function(content) {
  content = content.toString()
  content = content.replace('window', 'typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this')
  return content
})

module.exports = {
  mode: 'none',
  entry: __dirname + '/src/hello-async.js',
  output: {
    path: __dirname + '/dist',
    filename: 'hello-async.js',
    library: 'hello-async',
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
    UMDPlugin,
  ],
}
