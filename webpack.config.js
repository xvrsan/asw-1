module.exports = {
  mode: 'none',
  entry: __dirname + '/src/hello-async.js',
  output: {
    path: __dirname + '/dist',
    filename: 'hello-async.js',
    library: 'hello-async',
    libraryTarget: 'umd',
    globalObject: `typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ]
  },
  devtool: 'sourcemap',
}
