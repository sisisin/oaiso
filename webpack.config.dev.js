const path = require("path");

module.exports = {
  entry: { "index": path.resolve(__dirname, "./front/main.ts") },
  output: {
    path: path.join(__dirname, "./server/public/js"),
    filename: "[name].js"
  },
  devtool: 'source-map',
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['angular2-template-loader', 'ts-loader'], exclude: /node_modules/ },
      { test: /\.component\.html$/, loader: ["raw-loader"] },
      { test: /\.component\.css$/, loader: ["raw-loader"] },
    ]
  }
};
