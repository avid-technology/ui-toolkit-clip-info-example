# Clip Info App
The Clip Info app is an example of a custom app in MediaCentral Cloud UX using the CTMS API to display detailed data from Interplay Production. 

Once installed MediaCentral Cloud UX will have a new Pane called "Clip Info". When an Interplay Production asset is opened this pane will display two sets of data:
* Base
* Common

> :warning: **Disclaimer**: This example works only with files from Interplay Production.

This example was created using MediaCentral Cloud UX Toolkit:
* [cloudux-starter-kit ](https://www.npmjs.com/package/cloudux-starter-kit)

![Alt text](screenshot.png "Clip Info")

## Running the examples
To run these examples you will need a running MediaCentral Cloud UX server running. 
Connection settings can be changed in [src/project.config.json](src/project.config.json)

### Running the example
To run example you will need Avid MediaCentral | Cloud UX server. Properties
can we changed in [src/project.config.json](src/project.config.json "project.config.json").
After you change hostIp in `project.config.json` you can run application.

**from cli type:**
1. `npm install`
2. `npm start`
3. Go to [localhost](https://localhost/ "localhost").

**How to get onDrop asset ID?**
Just get it from [context](http://developer.avid.com/mcux_ui_plugin/clux-api/context.html)

**Check our development guide** [here](http://developer.avid.com/mcux_ui_plugin/introduction/doc/development_guide.html "Avid Developers").
