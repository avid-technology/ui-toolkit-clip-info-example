# Clip Info App
The Clip Info app is an example of a custom app in MediaCentral Cloud UX using the CTMS API to display detailed data from Interplay Production. 

Once installed MediaCentral Cloud UX will have a new Pane called "Clip Info". When an Interplay Production asset is opened this pane will display two sets of data:

* Warning: This example works only with files from Interplay Production.

This example was created using MediaCentral Cloud UX Toolkit:
* [cloudux-starter-kit ](https://www.npmjs.com/package/cloudux-starter-kit)

![Alt text](screenshot.png "Clip Info")

## Running the examples
To run these examples you will need a running MediaCentral Cloud UX server running. 
Connection settings can be changed in [src/project.act](src/project.act)

### Dependencies
* [cloudux-l10n ](https://www.npmjs.com/package/cloudux-l10n)

### Running the example
To run example you will need Avid MediaCentral | Cloud UX server. Properties
can we changed in [src/project.act](src/project.act "Project act").
After you change hostIp in `project.act` you can run application.

**from cli type:**
1. `npm install`
2. `npm start`
3. Go to [127.0.0.1:8080](https://127.0.0.1:8080/ "127.0.0.1:8080").

**Check our development guide** [here](http://developer.avid.com/mcux_ui_plugin/introduction/doc/development_guide.html "Avid Developers").
