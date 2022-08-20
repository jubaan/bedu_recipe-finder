// Plugins and Path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Rules
const rulesForCss = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const rulesForJs = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
}

const rulesForHtml = {
    test: /\.html$/i,
    loader: "html-loader",
}

const rulesForFiles = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
}

const rules = [rulesForHtml, rulesForJs, rulesForCss, rulesForFiles];

// Module exports
module.exports = {
    entry: {
        bundle: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true
    },
    module: {
        rules
    }
}
