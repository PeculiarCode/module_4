const path = require('path')
const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpack = require('webpack')

/**
 * @type {Configuration}
 */
module.exports = {
    entry: {
        app: './src/main.js',
        print: './src/print.js',
    },
    //快速定位错误信息
    devtool: 'inline-source-map',
    //web服务器实现热更新
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9001,
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.scss$/,
                //load加载顺序是从下往上
                use: [
                    {
                        loader: 'style-loader', // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'sass-loader', // 将 Sass 编译成 CSS
                    },
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
