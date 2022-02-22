const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// we're in ./config/
module.exports = {
    appBuild: resolveApp('build'),
    appNodeModules: resolveApp('node_modules'),
    appIndexJs: resolveApp('src/index.js'),
    appConfig: resolveApp('src/package.json'),
    appSrc: resolveApp('src'),
};
