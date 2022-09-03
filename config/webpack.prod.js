const baseWebpackConfig = require('./webpack.base.js')//共有的配置
const {merge} = require('webpack-merge')
module.exports = merge(baseWebpackConfig,{
    "mode": "production",
    devtool: 'cheap-module-source-map',
    //开启css压缩
    optimization:{
        minimize:true
    }
})
