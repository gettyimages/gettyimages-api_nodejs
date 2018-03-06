"use strict";

var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Countries extends GettyApiRequest {
    async execute(callback) {
        var credentials = this.credentials;
        var hostName = this.hostName;
        
        var path = "/v3/countries";
        var webHelper = new WebHelper(credentials, hostName);
        return await webHelper.get(path);
    }
}
    
module.exports = Countries; 
