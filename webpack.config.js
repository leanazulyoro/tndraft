var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: [
        './src/tndraft.jsx'
    ],
    output: {
        path: path.resolve(__dirname + '/public/dist'),
        publicPath: '/dist/',
        filename: 'tndraft.js'
    },
    module: {
        loaders: [

            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}