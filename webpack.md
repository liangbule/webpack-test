<!--
 * @Author: your name
 * @Date: 2022-04-09 11:29:58
 * @LastEditTime: 2022-04-09 23:31:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /code/webpack/webpack.md
-->
# 安装依赖
```
npm i webpack 
npm i webpack-cli
npm i -D webpack-dev-server
```
# 通过node_modules
```
不指定webpack打包文件
./node_modules/.bin/webpack
```
rm -rf dist 删除文件

# 模块热替换
```
模块热替换能做到在不重新加载整个网页的情况下，通过将被更新过的模块替换老的模块，再重新执行一次来实现实时预览
--hot
```
支持Source Map
解决打包编译后代码可读性差只需在启动时带上 --devtool source-map 参数。

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
Loader：模块转换器，用于把模块原内容按照需求转换成新内容。webpack本身只支持js和json两种文件类型，通过loaders去支持其他文件类型，将他们转化
Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

Mode : production - development

| 名称         | 描述                       |
| ------------ | -------------------------- |
| Babel-loader | 转换ES6、ES7等JS新特性语法 |
| Less-loader  | 支持css文件的加载和解析    |
| Css-loader   | 将less文件转化成css        |
| Ts-loader    | 将TS转化成JS               |
| File-loader  | 进行图片，字体等的打包     |
| Raw-loader   | 将文件以字符串形式导入     |
| Tread-loader | 多进程打包JS和CSS          |

常见Plugins有哪些

| 名称                    | 描述                                     |
| ----------------------- | ---------------------------------------- |
| CommonsChunkPlugin      | 将chunks相同的模块代码提取成公共js       |
| CleanWebpackPlugin      | 清理构建目录                             |
| EctracTextWebpackPlugin | 将CSS从bundle文件提取成一个独立的CSS文件 |
| CopyWebpackPlugin       | 将文件或者文件夹拷贝到构建的输出目录     |
| HtmlWebpackPlugin       | 创建html文件去承受输出的bundle           |
| UglifyjsWebpackPlugin   | 压缩JS                                   |
| ZipWebpackPlugin        | 将打包的资源生成一个zip包                |

## Mode的内置函数功能

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| Development | 设置 process.env.NODE_ENV值为development 开启 NamedChunksPlugin和NameModulesPlugin |
| Production  | 设置process.env.NODE_ENV值为production                       |

# 解析Es6
npm i @babel/core @babel/preset-env babel-loader -D
# 解析react语法
npm i @babel/preset-react
# 解析css -> less scss 
npm i style-loader css-loader -D
npm i less less-loader -D
# 解析图片
npm i file-loader -D
# 监听文件修改

# 代码压缩 
webpack5 不支持
css ： npm install --save-dev optimize-css-assets-webpack-plugin
css :  npm install css-minimizer-webpack-plugin --save-dev
# 删除dist 自动删除 output 目录
npm i clean-webpack-plugin -d
# CSS3前缀
postcss-loader
autoprefixer 插件 后置处理
webpack5 配置方法
npm install --save-dev postcss-loader postcss postcss-preset-env

# rem适配
px2rem-loader   npm i px2rem-loader -D
lib-flexible npm i lib-flexible -S
页面渲染根据根元素的font-size值