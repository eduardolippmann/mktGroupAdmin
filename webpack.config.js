const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src/web/private/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/web/public/')
    },
    watch:true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/web/private/index.html'),
            filename: path.resolve(__dirname, 'src/web/public/index.html')
        })
    ]
};