const path=require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    mode:"development",
    entry:path.resolve(__dirname,"src/index.js"),
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name]-[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,//node_modules依赖文件夹不编译，提高编译速度
                use: {
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                        //可以将babel编译的内容缓存到本地，加快babel编译速度
                        presets: [['@babel/preset-env'],{
                            useBuiltIns:"usage",
                            corejs:3
                        }],
                        plugins: ['@babel/transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag" 
                            //默认情况下，每个css文件都会生成一个style标签，
                            //"singletonStyleTag"使得所有的css文件使用同一个注入的标签
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag" //所有的css文件使用同一个注入的标签
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:10000,
                            //低于指定的限制时，可以返回一个 base64,减少图片请求链接。单位B
                            name:"[name]-[hash].[ext]",//为你的文件配置自定义文件名模板
                            outputPath:"imgs/"
                            //为你的文件配置自定义 output 输出目录,在dist目录下图片存放的目录
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"public/index.html")
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//告诉服务器从哪里提供内容
        port: 9000,//端口
        host: "0.0.0.0",//服务器外部可访问，默认是 localhost。
        hotOnly: true,//只更新模块，不刷新浏览器,开启hrm,自动添加webpack.HotModuleReplacementPlugin插件
        open: true,//自动打开浏览器
        proxy: {//跨域代理
            "/api": "http://localhost:3000"
        }
    },
}
