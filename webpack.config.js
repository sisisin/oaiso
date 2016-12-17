module.exports = {
  entry: './front/main.ts',
  output: {
    filename: 'server/public/js/index.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts-loader'] }
    ]
  }
};
