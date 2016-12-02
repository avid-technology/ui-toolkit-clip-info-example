/*
 * Copyright 2016 by Avid Technology, Inc.
 */

const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fsSync = require('fs-sync');
const fs = require('fs');

const outputPath = path.resolve(__dirname, 'dist/clip-info-example');

const packageJson = JSON.stringify({
        main: './index.js',
        avid: {
            format: 'amd',
            autoload: true
        }
    }, null, 2) + '\n';

fsSync.remove(outputPath);
if (fs.existsSync(outputPath)) {
    throw new Error('Failed to delete ' + outputPath);
}

fsSync.write(outputPath + '/package.json', packageJson);

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: outputPath,
        filename: 'index.js',
        libraryTarget: 'umd',
        sourceMapFilename: '[file]_[hash].map'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'}
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/views/clip-info/resources/custom_icon.png', to: 'resources' }
        ])
    ],
    postcss: [
        autoprefixer({
            browsers: [
                "last 2 Chrome versions",
                "last 2 Safari versions",
                "last 2 Firefox versions",
                "last 2 Edge versions"]
        })
    ],
    devtool: 'source-map'
};
