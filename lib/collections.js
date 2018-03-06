"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Collections extends GettyApiRequest{    
    execute() {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/collections";
        var webHelper = new WebHelper(credentials, hostName);
        return webHelper.get(path);
    }
}

module.exports = Collections;