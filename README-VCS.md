# App Creator Tool
App Creator Tool, allow you to develop and publish application for
**MediaCentral | Cloud UX**. If you are not familiar with this tool, we
encourage you to use our
[development guide](http://developer.avid.com/mcux_ui_plugin/introduction/doc/development_guide.html)

## Getting started
To use this application you will need following tools:
1. running **MediaCentral | Cloud UX 2018.6** machine
2. [node.js and npm](https://nodejs.org)
3. [docker](https://www.docker.com/) (for publishing)
4. [helm](https://helm.sh/) (for publishing)

## Project Properties
In the left toolbar you can see **App Creator Tool plugin**.
Inside plugin it you will find **Project Properties** those properties
allows you connect to your **MediaCentral | Cloud UX 2018.6** machine and
publish your application to **Avid Marketplace** (for more information check
[Quick Start](http://developer.avid.com/quickStart.html))

**Properties:**
- **Identity** - Fields that will identify your App on MarketPlace
    - **Application Name** - Name of you Application that will be displayed
in application
    - **Application ID** - You will receive **ID** when you will create profile
for you application (check [Quick Start](http://developer.avid.com/quickStart.html))
    - **Application Secret** - You will receive **Secret** when you will create profile
for you application (check [Quick Start](http://developer.avid.com/quickStart.html))
    - **Build** - your application build (**fill it before publish**)
    - **Version** - your application version (**fill it before publish**)
- **Signing**
    - **Login** - your avid login
    - **Developer ID** - your ID as developer (**optional**)
    - **Organization** - name of your organization/company
    - **Private key path** - Path to your private key (**required for publishing**)
- **Connection**
    - **MediaCentral Server** - hostname/ip adress of your CloudUX
    - **MediaCentral Server port (optional)** - port of your CloudUX, empty will use default port
    - **Developer server port** - Port on which you want to connect locally

## Running your application
To run application you will need to install [node.js and npm](https://nodejs.org).
Before you will start application set all **Connection options**
in **Application properties** then you are able to run project in two ways:
1. Using Terminal:
    1. In Visual Studio Code from **main toolbar** select **View** then select
    **Terminal**. At the bottom you will see terminal.
    2. In terminal type `npm install` to install all dependencies (can take few minutes)
    3. In terminal type `npm start` it will run your application on localhost with Local Port from
Application Properties.
    4. In terminal you will see address, open it in browser of your choice.
    5. Login to CloudUX, you will be able to see your app in the top toolbar.
    6. To stop application in terminal you need to press **ctrl +c**.
2. Using VSC:
    1. Before you can run application using VSC you need to make step 1 and 2
    user in terminal steps above
    2. After installation process is completed, press **F5** to start your application
    3. At the bottom you should see **Debug Console** of not, you can open it by
    selecting from **main toolbar** **view** then select **debug console** and you will
    see it at the bottom
    4. To stop application press **Shift + F5** or at the top you should see
    control panel with red square that after clicking it will stop your application.

## Publish
Before you will be able to publish your app register product and
check our [Quick Start](http://developer.avid.com/quickStart.html).
After you set your application properties, at the bottom toolbar next to
**Project Properties** you can see **Publish**. After you run it you will
see new bar where you need to write **password to your private key**, if
you don't use password just press **enter**. When publishing will be done
you will see message in the bottom right corner. This operation can take
few minutes.

## Building Docker image
If you want to build docker image for your project on the left side you
can find App Creator Tool button. When you use this button you will see dashboard
with build items. Inside it you can find option to build docker image

## Building feature-pack
If you want to build feature-pack for your project on the left side you
can find App Creator Tool button. When you use this button you will see dashboard
with build items. Inside it you can find option to build feature-pack

