module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname,
    modulesDirectories: ["web_modules", "node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /test(\/|\\).+\.js|\.es6(\/|\\)\w+\.js$/,
      loader: 'traceur',
      query: {
        runtime: true,
        sourceMaps: true,
      }
    }, {
      test: /.+\.json$/,
      loader: 'json',
    }]
  },
};
