const path = require("path")
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {HashedModuleIdsPlugin} = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports =smp.wrap( merge(common, {
    mode: "production",
    devtool: 'none',
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name]-[contenthash].js"//把js文件打包到js文件中
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:  'css/[name].[contenthash].css',// 直接引用【entry中配置】
            chunkFilename: 'css/[name].[contenthash].css',// 间接引用【其他地方引入使用的名字】
        }),
        new CompressionPlugin(),
        new HashedModuleIdsPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',//把映射清单提取出来
        minimizer: [new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),new TerserJSPlugin({})],//css js压缩
    }
}))