/*
 * @Author: your name
 * @Date: 2022-04-09 11:06:54
 * @LastEditTime: 2022-04-09 23:59:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /code/webpack/index.js
 */
const path = require("path");
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // 入口
  entry: "./src/adminApp.js",
  // entry: {
  //   app: "./src/index.js",
  //   adminApp: "./src/adminApp.js"
  // },
  // 输出
  // output: {
  //   // 把所有依赖的模块合并输出到一个 bundle.js 文件
  //   path: path.join(__dirname, "dist"),
  //   // 输出文件都放到 dist 目录下
  //   filename: "bundle.js",
  // },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    path: path.join(__dirname, "dist"),
    // 输出文件都放到 dist 目录下
    filename: '[name].js',
  },
  mode: "development",
  // mode: "production",
  module:{
    rules:[
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use:[
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  /**
   * hot 开启热更新
   */
  devServer: {
    // webpack 5弃用
    // contentBase: './dist',
    hot: false,
    static: './dist',
    // open: true,
    port: 8080,
  }
};
