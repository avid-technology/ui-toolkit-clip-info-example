const merge = require('webpack-merge');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const common = require('./webpack.common.config');

module.exports = merge(common, {
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            compress: {
                sequences: false,
                warnings: false
            },
            output: {
                semicolons: false
            },
            sourceMap: false
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240,
            minRatio: 0.8,
        })
    ]
});
