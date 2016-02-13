"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Collections extends GettyApiRequest{    
    execute(next) {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/collections";
        var webHelper = new WebHelper(credentials, hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    }
}

module.exports = Collections;