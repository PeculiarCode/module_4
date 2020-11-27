const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    resolveLoader: {
        modules: ['node_modules', './src/loader/'], // 配置加载本地loader
    },
    devServer: {
        contentBase: '/dist',
    }
})
