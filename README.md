# Clip Info App
The Clip Info app is an example of a custom app in MediaCentral Cloud UX using the CTMS API to display detailed data from Interplay Production. 

Once installed MediaCentral Cloud UX will have a new Pane called "Clip Info". When an Interplay Production asset is opened this pane will display two sets of data:

* Warning: This example works only with files from Interplay Production.

This example was created using MediaCentral Cloud UX Toolkit:
* [cloudux-starter-kit ](https://www.npmjs.com/package/cloudux-starter-kit)

![Alt text](screenshot.png?raw=true "Clip Info")

## Running the examples
To run these examples you will need a running MediaCentral Cloud UX server running. 
Connection settings can be changed in [src/project.act](src/project.act)

### Dependencies
* [cloudux-l10n ](https://www.npmjs.com/package/cloudux-l10n)

### MediaCentral Cloud UX Toolkit
This example contains a basic view that gets the info about the asset from Interplay Production.

Running:
    
    npm install
    npm start
