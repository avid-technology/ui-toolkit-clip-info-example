const express = require('express');
const http = require('http');
const proxy = require('http-proxy-middleware');
const request = require('request');
const config = require('../src/package.json');
const colors = require('../config/colors');
const fs = require('fs');
const path = require('path');

if (!config.hostIp.length) {
    console.error(`${colors.FgRed}No host specified for proxy.  Please run 'node setup'.${colors.Reset}`);
    process.exit(0);
}

let host = '';

if (config.hostPort) {
    host = `${config.hostIp}:${config.hostPort}`;
} else {
    host = config.hostIp;
}

const app = express();

// serve local module from file system
app.use(`/plugins/${config.name}`, express.static(path.resolve(__dirname,'../build/')));

// add local module to the list of plugins
app.get('/plugins/', (req, res, next) => {
    request({ url: `https://${host}/plugins/`, strictSSL: false, json: true}, (err, backendRes, body) => {
        res.json(body.concat({ name: config.name, type: 'directory' }));
    });
});

// Support for OSGI server
const osgiServer = `http://${config.osgiIp}:${config.osgiPort}`;

// workaround for wrong MAM redirect (http://localhost/api/mam/proxy/forresource redirecting to https and not respecting X-Forwarded-Proto)
app.use('/api/mam/proxy/forresource', proxy({
    target: osgiServer,
    secure: false,
    autoRewrite: true,
    protocolRewrite: 'http',
}));

// redirect osgi calls to osgi server
app.use(/^\/(osgi|api|push|player|com.avid.central.*)\/.*|^\/logout/, proxy({
    target: osgiServer,
    secure: false,
    autoRewrite: true,
    protocolRewrite: 'http',
    xfwd: true,
    pathRewrite: {
        // redirect osgi calls to the root uri of the osgi server - same what production nginx does
        '^/osgi/': '/',
        // workaround for wrong /player redirect (redirecting to https and not respecting X-Forwarded-Proto)
        '^/osgi/morpheus/player/package.json' : '/player/package.json',
    },
}));

const rootProxy = proxy({
    target: `https://${host}`,
    secure: false,
    autoRewrite: true,
    xfwd: true,
});

// redirect all other calls to the ui server
app.use('/', rootProxy);

// app.listen(80)

const server = require('spdy').createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../config/certs/localhost.key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../config/certs/localhost.cert.pem')),
}, app);

// websocket support
server.on('upgrade', rootProxy.upgrade);

server.listen(443).on('error', (err) => {
    console.error(`${colors.FgRed}ERROR: Couldn't start proxy on port 443.
    Is it already running?
    ${err}
    ${colors.Reset}`);
});
