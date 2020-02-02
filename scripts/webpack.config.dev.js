const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin=require('copy-webpack-plugin');
module.exports={
    mode:'development',
    entry:{
        main:'./src/index.js',
    },
    output: {
        // path:path.resolve(__dirname,'dist'),
        path:path.resolve(process.cwd(),'dist'),
        filename:'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader','less-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:8000,
                            //url-loader包含那file-loader
                            // 故可以把file-loader的options放在url-loader里面
                            name:'images/[name].[ext]',
                            publicPath:'/'
                        }
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'moban',
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
        }),
        new CopyPlugin([
            { from: path.resolve(process.cwd(),'src/static/'),
                to:path.resolve(process.cwd(),'dist/static')
            }
        ])
    ],
    devServer: {
        port:3000,
        open:'chrome',
        hot:true,
    }
}