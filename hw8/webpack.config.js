const {VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: ['./public/js/CartComponent.js', './public/js/ErrorComp.js', './public/js/FilterComp.js', './public/js/ProductComponent.js', './public/js/main.js'],
    output: {
        filename: "./js/build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: "../dist/css/",
                      },
                    },
                    "css-loader",
                ],
            },
            { 
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'public/img', to: 'img'},
                {from: 'public/icons', to: 'icons'}
            ]
        })
    ]
};