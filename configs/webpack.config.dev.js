const path = require("path")
const process = require("process")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const paths = require("./paths");

module.exports = {
    mode: "development",
    entry: [
        paths.appIndexJs
    ],
    output: {
        // pathinfo: true,
        filename: 'static/js/bundle.js' // development 환경에서는 여기에 실제로 뭔가 저장되지는 않는다. 바꿔가면서 실험
        // publicPath: "/",
    },
    resolve: {
        modules: ['node_modules', path.resolve(process.cwd(), "src")],
        extensions: [".js", "json", "jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: require.resolve("babel-loader"),
                options: {
                    cacheDirectory: true,
                    plugins:["lodash"]
                },
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve("style-loader"),
                    require.resolve("css-loader"),
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    require.resolve("style-loader"),
                    require.resolve("css-loader"),
                    require.resolve("sass-loader"),
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        new webpack.HotModuleReplacementPlugin(),
        new LodashWebpackPlugin(),
    ],
    performance: {
        hints: false,
    },
    devServer: {
        // compress: true, // 비교확인
        clientLogLevel: 'error',
        noInfo: true,
        contentBase: paths.appPublic,
        hot: true,
        // inline: true,
    }
}