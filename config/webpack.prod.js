const baseWebpackConfig = require('./webpack.base.js')//共有的配置
const {merge} = require('webpack-merge')
module.exports = merge(baseWebpackConfig, {
    "mode": "production",
    devtool: 'source-map',
    //开启css压缩
    optimization: {
        minimize: true,
        //    代码分割配置
        splitChunks: {
            chunks: 'all', // 对所有模块进行分割
            //    以下是默认值
            // minSize: 20000, // 分割代码最小的大小
            // minRemainingSize: 0, // 确保提取文件大小不能小于0
            // minChunks: 1,//至少被引用次数，才会分割代码
            // maxAsyncRequests: 30, // 按需加载时并行加载的最大数量
            // maxInitialRequests: 30, // 入口文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb会单独打包（此时会忽略minRemainingSize)
            // cacheGroups: { // 组，那些模块会打包到一个组
            //     defaultVendors: { // 组名
            //         test: /[\\/]node_modules[\\/]/,  //需要打包到一起的模块
            //         priority: -10,// 权重越大越高
            //         reuseExistingChunk: true, // 如果当前chunk包含已从主包bundle中拆分出的模块
            //     },
            //     default: { // 其他没有配置会使用上面默认配置
            //         minChunks: 2, // 这里的minChunks权重更大
            //         priority: -20,
            //         reuseExistingChunk: true,
            //     }
            //
            // },
            // 修改配置
            cacheGroups: { // 组，那些模块会打包到一个组
                defaultVendors: { // 组名
                    test: /[\\/]node_modules[\\/]/,  //需要打包到一起的模块
                    priority: -10,// 权重越大越高
                    reuseExistingChunk: true, // 如果当前chunk包含已从主包bundle中拆分出的模块
                },
                default: { // 其他没有配置会使用上面默认配置
                    minSize: 0, // 我们定义文件体积大小了，所以要改打包最小文件体积
                    minChunks: 2, // 这里的minChunks权重更大
                    priority: -20,
                    reuseExistingChunk: true,
                }

            }
        },
        // 缓存文件
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}.js`
        }
    },
})
