const { merge } = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CssPathTransfor = require('./plugin/CssPathTransfor')
module.exports = merge(common, {
    plugins: [new UglifyJSPlugin(), new CssPathTransfor()],
    mode: 'production',
    resolveLoader: {
        modules: ['node_modules', './src/loader/'], // 配置加载本地loader
    },

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
                test: /\.txt$/,
                use: ['uppercase?type=1', 'reverse'],
            },
        ],
    },
})
