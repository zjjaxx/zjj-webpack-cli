const path = require("path")
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports =merge(common, {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name]-[hash].js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),//告诉服务器从哪里提供内容
        port: 8080,//端口
        // host: "0.0.0.0",//服务器外部可访问，默认是 localhost。
        hot: true,
        hotOnly: true,//只更新模块，不刷新浏览器
        open: true,//自动打开浏览器
        proxy: {//跨域代理
            "/api": "http://localhost:3000"
        }
    }
})
