const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	devtool: "eval-source-map", //生产阶段不建议启动
	entry: __dirname + "/app/main.js", //入口文件
	output: {
		path: __dirname + "/build",
    filename: "bundle-[hash].js"
	},

	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, // 不跳转
		inline: true, //实时刷新
		hot: true,
		port: "3033"
	},

	module: {
		rules: [
		{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: "babel-loader"
				/*options: {
					presets: [
						"env", "react"
					]
				}*/
			},
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			use:[{
				loader:"style-loader"
			},{
				loader: "css-loader",
        options: {
            modules: true // 指定启用css modules
            //localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
        }
			},{
				loader: "postcss-loader"
			}
			]
		}
		]
	},
	plugins:[
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template : __dirname + "/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin(),	//热加载插件
    
		new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
	],
};