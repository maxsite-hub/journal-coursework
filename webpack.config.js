const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production' //в каком режиме собираеться проект 
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

console.log('IS PROD', isProd)
console.log('IS DEV', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'), // указываем все исходникик в папке src
    mode: 'development', //по умолчанию webpack в режиме разработке чтобы писать меньше кода в консоли
    entry: './index.js', // указываем главный файл
    output: {
        filename: filename( 'js'),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js'],
        // import '../../../Component' 
        alias: { // чтобы не писать длинные пути
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },

    // devtool: isDEV ? 'source-map' : false,
    // devServer: {
        
    //         port: 3000,
    //         hot: isDev
        
    // },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html', // откуда береться шаблон html 
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin(
            {
                patterns: [

                    {
                        from: path.resolve(__dirname, 'src/favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    }

                ]
            }),
        new MiniCssExtractPlugin({
            filename: filename( 'css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            //   {
            //     test: /\.js$/,
            // exclude: /node_modules/,
            // loader: {
            //   loader: 'babel-loader',
            //   options: {
            //     presets: ['@babel/preset-env']
            //       }
            //     }
            // }
        ]
    }
}

