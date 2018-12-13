# MediaCentral UX | CloudUX

This is example project created with [cloudux-starter-kit](https://www.npmjs.com/package/cloudux-starter-kit) for
**MediaCentral | Cloud UX**. If you are not familiar with this tool, we
encourage you to use our
[development guide](http://developer.avid.com/mcux_ui_plugin/introduction/doc/development_guide.html)

## Getting started
To use this application you will need following tools:
1. running **MediaCentral | Cloud UX 2018.6** machine
2. [node.js and npm](https://nodejs.org)
3. [docker](https://www.docker.com/) (for publishing)
4. [helm](https://helm.sh/) (for publishing)

Before you will lunch your application you may need to change
[proxy Setup](src/project.config.json) and change **hostIp** to point your
machine with working **MediaCentral | Cloud UX 2018.6**

To run this application in your CLI from root type:
1. `npm install` to install all required modules (it can take few minutes),
2. `npm start` to run application,
3. In terminal you will see address, open it in browser of your choice.
4. Login to CloudUX, you will be able to see this app in the top toolbar.

## project.config.json
In the src folder you can find [project.config.json](src/project.config.json) where you
can change your project settings.

**Properties:**
- **identity** - Fields that will identify your App on MarketPlace
    - **description** - description of you Application that will be displayed
    - **build** - your application build (fill it before publish)
    - **version** - your application version (fill it before publish)
- **signing**
    - **login** - your avid login
    - **developerID** - your ID as developer (optional)
    - **organization** - name of your organization/company
    - **privateKeyPath** - Path to your private key (required for publishing)
- **connection**
    - **hostIp** - hostname/ip adress of your CloudUX
    - **hostPort** - port of your CloudUX, if empty use default port
    - **proxyPort** - Port on which you want to connect locally

## package.json
[package.json](src/project.act) contain information about application name and keys to
identify your application on marketplace

- **identity**
    - **appName** - Name of you application
- **avid** - Information to identify your application on marketplace
    - **alias** - You will receive **ID** when you will create profile
for you application (check [Quick Start](http://developer.avid.com/quickStart.html))
    - **secret** - You will receive **Secret** when you will create profile
for you application (check [Quick Start](http://developer.avid.com/quickStart.html))

## Publishing
For publishing read our [Quick Start](http://developer.avid.com/quickStart.html).

To Publish your application from CLI you will need
1. [cloudux-starter-kit](https://www.npmjs.com/package/cloudux-starter-kit)
2. [docker](https://www.docker.com/)
3. [helm](https://helm.sh/)

Remember to set your [Application ID](src/package.json) and
[Application sercret](src/package.json).
 You can get them from [marketplace](https://my.avid.com/shop/BusinessOrientation)

 To publish your application in the root of your project just type in CLI **npm run publish**

### Building feature-pack
If you want to build feature-pack in the root of your project type in CLI **npm run buildFeaturePack**
### Building docker image
If you want to build feature-pack in the root of your project type in CLI **npm run buildImage**



