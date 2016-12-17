module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'source-map-support'],
    files: ['./front/karma.entry.js'],
    exclude: [],
    preprocessors: {
      './front/karma.entry.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: { extensions: ['.ts', '.js'] },
      module: {
        rules: [
          // { enforce: 'pre', test: /\.ts$/, exclude: ['node_modules', /\.spec.ts$/], loader: 'istanbul-instrumenter' },
          { test: /\.ts$/, exclude: /node_modules/, loaders: ['angular2-template-loader', 'ts-loader'] },
          { test: /\.html/, loader: 'raw-loader' },
          { test: /\.css$/, loader: 'raw-loader' }
        ]
      },
    },
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
}
