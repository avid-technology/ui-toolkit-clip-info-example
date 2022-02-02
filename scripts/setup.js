/*
 *  Copyright 2017 by Avid Technology, Inc.
 */

const readline = require('readline');
const fs = require('fs');
const colors = require('../config/colors.js');
const async = require('async');
const paths = require('../config/paths');

console.log(`${colors.FgYellow}






  Avid Developer Toolkit Setup Script
  -----------------------------------------------------------------------------

  This script will help you setup your environment to start building your own app for Cloud UX.${colors.Reset}`);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('close', () => {
    process.exit(0);
});

const config = JSON.parse(fs.readFileSync(paths.appConfig));

// utility function for reading input...
function query(prompt, error, success) {
    rl.removeAllListeners();
    rl.setPrompt(`\n  ${colors.FgMagenta}${prompt}${colors.Reset}`);
    rl.on('line', (input) => {
        const errorString = error(input);
        if (errorString) {
            console.log(`  ${colors.FgRed}${errorString}${colors.Reset}`);
            // try again...
            rl.prompt();
            return;
        }
        success(input);
    });
    rl.prompt();
}


function getProjectName(cb) {
    query(
        'Your project name: ',
        (input) => {
            if (input.length === 0) {
                return 'Empty input.  Please try again.';
            }
            // we're good
            return null;
        },
        (input) => {
            console.log(`  ${colors.FgGreen}Updating project name.${colors.Reset}`);

            config.name = input.replace(/\s/g, '');
            fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
    
            cb();
        }
    );
}


function getProjectDescription(cb) {
    query(
        'Your project description: ',
        (input) => {
            if (input.length === 0) {
                return 'Empty input.  Please try again.';
            }
            // we're good
            return null;
        },
        (input) => {
            console.log(`  ${colors.FgGreen}Updating project description.${colors.Reset}`);

            config.description = input;
            fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
    
            cb();
        }
    );
}

function getHostIp(cb) {
    query(
        'Your MediaCentral server host IP (for development): ',
        (input) => {
            if (input.length === 0) {
                return 'Empty input.  Please try again.';
            }
            // we're good
            return null;
        },
        (input) => {
            console.log(`  ${colors.FgGreen}Updating config.${colors.Reset}`);

            config.hostIp = input;
            fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
    
            cb();
        }
    );
}

function getHostPort(cb) {
    query(
        'Your MediaCentral server host port (optional): ',
        (input) => {
            if (input.length === 0) {
                return null;
            }
        },
        (input) => {
            if (input.length !== 0) {
                console.log(`  ${colors.FgGreen}Updating config.${colors.Reset}`);

                config.hostPort = input;
                fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
            }
            cb();
        }
    );
}

function getOsgiIp(cb) {
    query(
        'Your MediaCentral server OSGI ip (default = host IP): ',
        (input) => {
            if (input.length === 0) {
                return null;
            }
        },
        (input) => {
            if (input.length === 0) {
                console.log(`  ${colors.FgGreen}Default.${colors.Reset}`);

                config.osgiIp = config.hostIp;
                fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
            } else {
                console.log(`  ${colors.FgGreen}Updating config.${colors.Reset}`);

                config.osgiIp = input;
                fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
            }
            cb();
        }
    );
}

function getOsgiPort(cb) {
    query(
        'Your MediaCentral server OSGI port (default 8480): ',
        (input) => {
            if (input.length === 0) {
                return null;
            }
        },
        (input) => {
            if (input.length !== 0) {
                console.log(`  ${colors.FgGreen}Updating config.${colors.Reset}`);

                config.osgiPort = input;
                fs.writeFileSync(paths.appConfig, JSON.stringify(config, null, '  '));
            }
            cb();
        }
    );
}

function done() {
    console.log(`
  ${colors.FgGreen}Done!

  ${colors.FgYellow}-----------------------------------------------------------------------------
  ${colors.FgYellow}To start your local proxy, type 'node server' and load 'https://localhost" in your favorite browser
  ${colors.Reset}`
    );
    
    rl.close();
}


async.series(
    [
        getProjectName,
        getProjectDescription,
        getHostIp,
        getHostPort,
        getOsgiIp,
        getOsgiPort,
    ],
    done
);
