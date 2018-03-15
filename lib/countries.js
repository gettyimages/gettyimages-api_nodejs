"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Countries extends GettyApiRequest {
    execute() {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/countries";
        var webHelper = new WebHelper(credentials, hostName);
        return webHelper.get(path);
    }
}
    
module.exports = Countries; 
