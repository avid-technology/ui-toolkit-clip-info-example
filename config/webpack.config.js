/**
 * Copyright 2017 by Avid Technology, Inc.
 */

const paths = require('./paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        filename: 'index.js',
        libraryTarget: 'amd',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|build)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, // https://github.com/webpack/webpack/issues/684
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true },
                        }],
                }),
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') +
            ' (:elapsed seconds)',
            clear: false,
        }),
        new LoaderOptionsPlugin({
            minimize: true,
        }),
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
        new CopyWebpackPlugin([
            {
                from: 'src/l10n/lang.*.json',
                to: 'resources/',
                flatten: true,
            }]),
        new CopyWebpackPlugin([
            {
                from: 'src/package.json',
                to: '.',
                flatten: true,
            }]),
        new CopyWebpackPlugin([
            {
                from: 'src/images/icon.svg',
                to: 'images/',
                flatten: true,
            }]),
        new UglifyJsPlugin({
            compress: {
                sequences: false,
            },
            output: {
                semicolons: false,
            },
            sourceMap: false,
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: [paths.appNodeModules],
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    },
    devtool: 'eval',
};
