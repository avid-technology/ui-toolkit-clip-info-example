const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/project.act'), 'utf8'));
config.identity.appName = require('../src/package.json').identity.appName;
config.main = require('../src/package.json').main;
config.avid = require('../src/package.json').avid;

const start = require('ui-toolkit-common-example');
const indexPath = path.join(__dirname, '../src/index.js');
const nodeModulesPath = path.join(__dirname, '../node_modules');
const host = config.connection.hostIp;
const proxyPort = config.connection.proxyPort;

start(indexPath, nodeModulesPath, host, proxyPort, config);

className="cux-toolbar"
