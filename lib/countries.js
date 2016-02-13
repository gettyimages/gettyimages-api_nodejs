"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Countries extends GettyApiRequest {
    execute(callback) {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/countries";
        var webHelper = new WebHelper(credentials, hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    }
}
    
module.exports = Countries; 
