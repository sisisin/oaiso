const path = require("path");

module.exports = {
  entry: { "index": path.resolve(__dirname, "./_tmp/main.js") },
  output: {
    path: path.join(__dirname, "./server/public/js"),
    filename: "[name].js"
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.component\.html$/, loader: ["raw-loader"] },
      { test: /\.component\.css$/, loader: ["raw-loader"] },
    ]
  }
};
