module.exports = {
  entry: __dirname + "/public/js/app.js",
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: [
        "style-loader",
        "css-loader"
      ]
    }]
  },
  devServer: {
    contentBase: "./public",
    hot: true
  }
}
