const cloudux = require('cloudux-starter-kit');
const config = require('../src/project.config');

cloudux.connect({
        hostIp: config.connection.hostIp,
        hostPort: parseInt(config.connection.hostPort, 10),
        proxyPort: parseInt(config.connection.proxyPort, 10)
    }
);
