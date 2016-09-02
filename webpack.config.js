var webpack = require('webpack')
var vue = require('vue-loader')
var path = require('path')
var fs = require('fs')

function getEntry() {
  var jsPath = path.join(__dirname, '/src/vue');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [], files = {};
  dirs.forEach(function (item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.join(__dirname, '/src/vue', item);
    }
  });
  return files;
}

module.exports = {
  //页面入口文件配置
  entry: getEntry(),
  //入口文件输出配置
  output: {
    path: './dist/js/',
    //publicPath: '/static/',
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.vue$/,
        loader:'vue'
      },
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  watch:true
};

// if (process.env.NODE_ENV === 'production') {
//   module.exports.plugins = [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.optimize.OccurenceOrderPlugin()
//   ];
// } else {
//   module.exports.devtool = '#source-map';
// }
