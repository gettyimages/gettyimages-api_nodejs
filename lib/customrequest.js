"use strict";
var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class CustomRequest extends GettyApiRequest {    
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.method = null;
        this.route = null;  
        this.body = null;  
        this.queryParameters = {};    
    }
    
    withMethod(method) {
        this.method = method ;
        return this;
    }
    
    withRoute(route) {
        this.route = route;
        return this;
    }

    withQueryParameters(queryParameters) {
        this.queryParameters = queryParameters;
        return this;
    }
    
    withBody(body) {
        this.body = body;
        return this;
    }
 
    execute() {
                
        if(!this.route) {
            throw new SdkException("must specify a route");
        }
        
        var path = "/v3/" + this.route;

        path += "?" + qs.stringify(this.queryParameters);

        var webHelper = new WebHelper(this.credentials, this.hostName);

        switch(this.method) {
            case "get":
                return webHelper.get(path);
            case "post":
                return webHelper.postQuery(path, this.body);
            case "put":
                return webHelper.putQuery(path, this.body);
            case "delete":
                return webHelper.deleteQuery(path);                
            default:
            throw new SdkException("No appropriate HTTP method found for this request.");
        }
       
    }
}

module.exports = CustomRequest;