var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'src');
var DATA_DIR = path.resolve(__dirname, 'json');

module.exports = {
    devtool: '#eval-source-map',
    entry: [
        APP_DIR + '/index.js',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ['babel'],
                include: APP_DIR,
            },
            {
                test: /\.json$/,
                loader: 'json',
                include: DATA_DIR,
            },
        ],
    },
};
