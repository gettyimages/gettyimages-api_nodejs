"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Collections extends GettyApiRequest{    
    async execute() {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/collections";
        var webHelper = new WebHelper(credentials, hostName);
        // try {
        return await webHelper.get(path);
        // } catch (err) {
        //     console.error("Error calling get")
        // }
    }
}

module.exports = Collections;