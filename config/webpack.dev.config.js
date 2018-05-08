const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/project.act'), 'utf8'));

let host = '';

if (config.connection.hostPort && config.connection.hostPort.length > 0) {
    host = `${config.connection.hostIp}:${config.connection.hostPort}`;
} else {
    host = config.connection.hostIp;
}

module.exports = merge(common, {
    devtool: 'cheap-eval-source-map',

    devServer: {
        proxy: {
            '/': {
                target: `https://${host}`,
                secure: false,
                autoRewrite: true,
                xfwd: true,
            }
        }
    },

    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') +
            ' (:elapsed seconds)',
            clear: false,
        })
    ]
});
