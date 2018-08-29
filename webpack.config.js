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
      content = content.replace('exports.default = HelloAsync;', 'module.exports = HelloAsync;')
      content = content.replace(/exports\.(.*?)\.default;/g, '')
      content = content.replace(/exports\.\$async(.*?)\.\$async;/, '')
      content = content.replace(/exports\.\$await(.*?)\.\$await;/, '')
      return content
    }),
  ],
}