const path = require('path');
const starterKit = require('cloudux-starter-kit');
const config = require('../src/project.config.json');
const packageJson = require('../src/package');

starterKit({
    project: path.join(__dirname, '../'),
    name: packageJson.identity.appName,
    config: {
        version: config.identity.version.toString(),
        organization: config.signing.organization,
        developerID: config.signing.developerID,
        appID: packageJson.avid.alias,
        appSecret: packageJson.avid.secret
    },
    build: true,
});
