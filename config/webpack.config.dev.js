// deno-lint-ignore-file
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: './main.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "../dist"),
        library: "dom"
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }, {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|png|gif|jpg|jpeg|obj)(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ejs', '.json', '.jsx', '.ts', '.tsx', '.css', '.jpg', '.jpeg', '.png', '.gif']
    },

    devServer: {
        proxy: {
            '/api': 'http://localhost:8081'
        },
        https: false
    },
    devtool: 'source-map',
    target: 'web',

    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
};