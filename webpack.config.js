const path = require('path')
const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

/**
 * @type {Configuration}
 */
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
    },
    //快速定位错误信息
    devtool: 'inline-source-map',
    //web服务器实现热更新
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8088,
        hot: true,
    },
    optimization: {
        usedExports: true,
        minimize: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                //load加载顺序是从下往上
                use: ['style-loader','css-loader','sass-loader',
                 /*    {
                        loader: 'style-loader', // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'sass-loader', // 将 Sass 编译成 CSS
                    }, */
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
}
