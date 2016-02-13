"use strict";
var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _id = new WeakMap();
const _fileType = new WeakMap();
const _height = new WeakMap();

class ImagesDownloads extends GettyApiRequest {    
    set id(value) {
        _id.set(this,value);
    }
    get id() {
        return _id.get(this);
    }
    
    set fileType(fileType) {
        _fileType.set(this,fileType);
    }
    
    get fileType() {
        return _fileType.get(this);
    }
    
    set height(height) {
        _height.set(this,height);
    }
    
    get height() {
        return _height.get(this);
    }
    
    withFileType(fileType) {
        this.fileType = fileType ;
        return this;
    }
    
    withId(id) {
        this.id = id;
        return this;
    }

    withHeight(height) {
        this.height = height;
        return this;
    }
 
    execute(callback) {
        var id = this.id;
        var credentials = this.credentials;
        var hostName = this.hostName;
        var fileType = this.fileType;
        var height = this.height;
                
        if(!id) {
            throw new SdkException("must specify an image id");
        }
        
        var path = "/v3/downloads/images/";
        path += this.id;
        var params = { auto_download: false };
        if (fileType) {
            params.file_type = fileType;
        }
        
        if (height) {
            params.height = this.height;
        }

        path += "?" + qs.stringify(params);

        var webHelper = new WebHelper(credentials, hostName);
        webHelper.postQuery(path, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    }
}

module.exports = ImagesDownloads;