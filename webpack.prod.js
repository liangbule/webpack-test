/*
 * @Author: liangbule
 * @Date: 2022-04-09 11:06:54
 * @LastEditTime: 2022-04-09 23:59:51
 * @LastEditors: Please set LastEditors
 * @FilePath: /code/webpack/index.js
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // 入口
  // entry: "./src/index.js",
  entry: {
    app: "./src/index.js",
    adminApp: "./src/adminApp.js",
  },
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
    // path: path.resolve(process.cwd(), 'dist'),
    // 输出文件都放到 dist 目录下
    filename: "[name][chunkhash:8].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader",],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          // 兼容css前缀
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            // 文件指纹
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|tof)$/,
        use: [
          {
            // 文件指纹
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      title: "不配置模板",
      template: path.join(__dirname, "src/admin.html"),
      filename: "admin.html",
      // chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    // template title 无效
    new HtmlWebpackPlugin({
      title: "indexbuild",
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
