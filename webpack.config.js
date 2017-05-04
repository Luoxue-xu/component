var webpack = require('webpack');
var path = require('path');
var glob = require('glob');// glob模块，用于读取webpack入口目录文件
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getEntry = function() {
    var entry = {}; //读取开发目录,并进行路径裁剪
    glob.sync('./app/*.js')
        .forEach(function(name) {
            var start = name.indexOf('app/') + 4,
            end = name.length - 3;
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口
            entry[n] = name;
        });
    return entry;
};

module.exports = {
    entry: getEntry(), // 唯一的入口文件
    output: {
        path: path.resolve(__dirname, './dist'), // 打包之后的文件路径
        filename: 'js/[name]-[hash].js', // 打包之后的文件名
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '', // 线上路径
    },
    resolve: {
        alias: {}
    },
    module: { // 添加需要的rules
        rules: [
            {
                test: /\.json$/, // 处理json
                use: [ 'json-loader' ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // 是否开启模块化
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [ // 插件
        new HtmlWebpackPlugin({ // 根据模板文件自动创建html
            filename: 'index.html',
            template: __dirname + "/app/index.tmpl.html"
        }),
        new CleanPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.NoEmitOnErrorsPlugin()

        // new webpack.optimize.CommonsChunkPlugin({
        //     chunks: 'vendors',
        //     minChunks: Infinity // 提取所有entry共同依赖的模块
        // })
    ],
    devServer: {
        contentBase: './dist', // 服务器根目录
        historyApiFallback: true, // 返回是否不跳转
        inline: true, // 是否实时刷新
        port: 4004, // 端口号 默认是8080
        hot: true,
        stats: {
            colors: true
        }
    }
}

// 判断开发环境还是生产环境,添加uglify等插件
// new webpack.DefinePlugin({
//     __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
// }),
// new webpack.optimize.UglifyJsPlugin({
//     compress: {
//         warnings: false
//     }
// }),
// new webpack.optimize.OccurenceOrderPlugin()

// __dirname 是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
