const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8099,
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'WebApp',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
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
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
}
