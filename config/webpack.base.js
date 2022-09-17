const os = require('os')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin')
const threads = os.cpus().length
console.log(threads)
//自定义loader
const getStyleLoader = (pre) => {
    return [
        MiniCssExtractPlugin.loader, 'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",
                    ]
                }
            }
        },
        pre,
    ].filter(Boolean)
}
module.exports = {
    //    模式
    mode: "development",
    //入口
    // entry: '../src/index.js', // 相对路径
    entry: {
        home: '../src/index.js',
        personal: '../src/personal.js'
    },
    // 输入
    output: {
        //    文件输出路径
        path: path.resolve(__dirname, '../dist'),
        //    文件名
        filename: "js/main.js",
        clean: true
    },
    //    加载器
    module: {
        rules: [
            {
                // 每个文件只能被其中一个loader处理
                oneOf: [
                    //    loader配置
                    {
                        test: /\.css$/, // 检测.css结尾文件
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader
                            }, {
                                loader: "css-loader"
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env",
                                        ]
                                    }
                                }
                            },
                            {
                                loader: "less-loader"
                            }
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [{
                            loader: MiniCssExtractPlugin.loader
                        }, {
                            loader: "css-loader"
                        },
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env",

                                        ]
                                    }
                                }
                            },
                            {
                                loader: "sass-loader",
                            }]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/i,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024,
                            }
                        },
                        generator: {
                            //    输出图片名称
                            filename: "static/images/[hash:8][ext][query]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,
                        type: "asset/resource",
                        generator: {
                            filename: "static/media/[hash:8][ext][query]"
                        }
                    },
                    {
                        test: /\.(m?js|jsx|tsx|tx)$/,
                        exclude: /node_modules/, // 排除node_modules文件js处理
                        include: path.resolve(__dirname, '../src'),
                        use: [
                            {
                                loader: 'thread-loader', // 开启多进程
                                options: {
                                    works: threads
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-react'],
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: ['@babel/plugin-transform-runtime']
                                },
                            }
                        ]
                    }
                ]
            },
        ]
    },
    //   插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new ESLintPlugin({
            //检测src
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules", // 排除node
            cache: true, // 缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache') // 缓存地址
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[hash:3].css",
        }),
        // new CssMinimizerPlugin(),
        // new TerserWebpackPlugin({
        //     parallel: threads
        // })
    ],
    // 压缩操作
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                parallel: threads
            }),
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", {interlaced: true}],
                            ["jpegtran", {progressive: true}],
                            ["optipng", {optimizeationLevel: 5}],
                            ["svgo",
                                {
                                    plugins: [
                                        "prsset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmInsOrder: "alphabetical"
                                            }
                                        }
                                    ]
                                }]
                        ]
                    }
                }
            })
        ]
    },
    // 解析模块
    resolve: {
        extensions: ['*', '.js', '.jsx', ".json"],
    },
}
