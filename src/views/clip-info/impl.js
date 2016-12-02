/*
 * Copyright 2016 by Avid Technology, Inc.
 */

"use strict";
    
var coAPI = require('avid-mcux-common-object'),
    activeAsset = require('avid-mcux-active-asset'),
    jq = require("jquery"),
    hID = "",
    hType = "interplay";

function printRelatives(data) {
    if (data.relatives == null) {
        jq("#result").html("No relatives.");
        return;
    }

    var html = `<fieldset class='clipinfo-fieldset'>
                    <legend class='clipinfo-fieldset-legend'>
                        Relatives
                    </legend>
                    <table class="clipinfo-table">
                `;
    jq.each(data.relatives, function(i,v) {
        html += `<tr class="clickable" id='${v.base.id}'>
                    <td>${v.common.name}</td>
                    <td>${v.base.type}</td>
                 </tr>`;
    });
    html += `</table></fieldset>`;
    jq("#result").html(html);
    
    
    // Set up a timeout to let the DOM set up, then add click handlers to the
    // links
    setTimeout(function() {
        jq.each(data.relatives, function(i,v) {
            jq('#'+v.base.id).click(v.base, function(event) {
                // Build the common object and once completed set it as the 
                // active asset
                coAPI.resolve(hType+":"+hID+":"+event.data.type+":"+event.data.id)
                .then(function(object) {
                    activeAsset.set({commonObject:object});
                });
            });
        });
    }, 100);
}

function printFilemobs(data) {
    if (data['media-items'] == null) {
        jq("#locations").html("No filemobs.");
        return;
    }

    var html = `<fieldset class='clipinfo-fieldset'>
                    <legend class='clipinfo-fieldset-legend'>
                        File Locations
                    </legend>
                    <table class="clipinfo-table">
                `;
    jq.each(data['media-items'], function(i,v) {
        html += `<tr>
                    <td>${v.track}</td>
                    <td>${v.filePath}</td>
                 </tr>`;
    });
    html += `</table></fieldset>`;
    jq("#locations").html(html);
}

function resolve(co) {
    // Load the asset info from the mediaInfo API to get the mobid of the pam 
    // asset instead of the handle
    var id = co.base.id;
    if (id.indexOf("interplay") == -1) {
        id = co.base.systemType + ":" + co.base.systemID + ":" +
            co.base.type + ":" + co.base.id;
    } 
    
    jq.getJSON('/api/mediaInfo/'+id)
    .fail(function() {
        jq("#result").html("Wrong asset type");
        jq('#locations').html("Wrong asset type");
    })
    .done(function(data) {
        var assetid = data.mediaInfo.mobId;
        jq.ajax({
            accepts: {
                hal:"application/hal+json"    
            },
            url:'/apis/avid.pam;version=0;realm=global/assets/'+assetid+'/relatives'
        })
        .fail(function() {
            jq('#result').html("Error loading relatives.");
        })
        .done(printRelatives);   

        if (co.base.type === "sequence") {
            jq('#locations').html("Can't display pathes for sequences");
        } else {
            jq.ajax({
                accepts: {
                    hal:"application/hal+json"    
                },
                url:'/apis/avid.pam;version=0;realm=global/assets/'+assetid+'/filemobs'
            })
            .fail(function() {
                jq('#locations').html("Error loading filepathes.");
            })
            .done(printFilemobs);               
        }
    });        
}

module.exports = {
    _onAssetChange: function(asset) {
        console.info("New Asset: "+asset);
        if (!asset || !asset.commonObject) {
            return;
        }
        if (asset.commonObject.base.systemType !== "interplay") {            
            jq("#result").html("Only works with Interplay Assets");
            jq('#locations').html("Only works with Interplay Assets");
            return;
        }
        jq("#result").html("Loading Relatives ...");
        jq('#locations').html("Loading File locations ...");
        hID = asset.commonObject.base.systemID; // Track the system id here because CTMS
                                                // currently returns system name, not ID
        resolve(asset.commonObject);
        
        
    },
    createElement: function () {
        var content = require('./resources/content.html');
        this.el = new DOMParser().parseFromString(content, 'text/html').body.firstElementChild;
        return Promise.resolve(this.el);
    },
    onInit: function () {
        require('./resources/styles.scss');
    },
    onRender: function () {
        activeAsset.addListener(this._onAssetChange.bind(this));
    },
    onFocusLost: function () {},
    onFocusGained: function () {},
    onDestroy: function () {
        activeAsset.removeListener(this._onAssetChange.bind(this));
    },
    helpSite: "",
    onRevalidate: function () {},
    getMinWidth: function () {return 250;},
    getMinHeight: function () {return 250;},
    publicScope: {}
};

