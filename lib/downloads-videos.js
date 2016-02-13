"use strict";
var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _id = new WeakMap();
const _size = new WeakMap();

class VideoDownloads extends GettyApiRequest {
    
    set id(value) {
        _id.set(this,value);
    }
    
    get id() {
        return _id.get(this);
    }
    
    set size(value) {
        _size.set(this,value);
    }
    
    get size() {
        return _size.get(this);
    }
    
    withId(id) {
        this.id = id;
        return this;
    }
    
    withSize(size) {
        this.size = size;
        return this;
    }
    
    execute(next) {
        if(!this.id) {
            throw new SdkException("must specify a video id");
        }
        
        var path = "/v3/downloads/videos/";
        path += this.id;
        var params = { auto_download: false };
        if (this.size) {
            params.size = this.size;
        }

        path += "?" + qs.stringify(params);

        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.postQuery(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
        
    }
}

module.exports = VideoDownloads;