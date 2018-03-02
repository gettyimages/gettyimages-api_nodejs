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
 
    execute(callback) {
                
        if(!this.route) {
            throw new SdkException("must specify a route");
        }
        
        var path = "/v3/" + this.route;

        path += "?" + qs.stringify(this.queryParameters);

        var webHelper = new WebHelper(this.credentials, this.hostName);

        switch(this.method) {
            case "get":
                webHelper.get(path, function (err, response) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, response);
                    }
                });
                break;
            case "post":
                webHelper.postQuery(path, this.body, function (err, response) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, response);
                    }
                });
                break;
            case "put":
                webHelper.putQuery(path, this.body, function (err, response) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, response);
                    }
                });
                break;
            case "delete":
                webHelper.deleteQuery(path, function (err, response) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, response);
                    }
                });
                break;
            default:
            throw new SdkException("No appropriate HTTP method found for this request.");
        }
       
    }
}

module.exports = CustomRequest;