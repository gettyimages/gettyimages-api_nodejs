"use strict";
var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _id = new WeakMap();
const _size = new WeakMap();
const _productId = new WeakMap();

class VideoDownloads extends GettyApiRequest {
    
    set id(value) {
        _id.set(this,value);
    }
    
    get id() {
        return _id.get(this);
    }

    set productId(value) {
        _productId.set(this,value);
    }
    
    get productId() {
        return _productId.get(this);
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

    withProductId(productId) {
        this.productId = productId;
        return this;
    }
    
    withSize(size) {
        this.size = size;
        return this;
    }
    
    execute() {
        if(!this.id) {
            throw new SdkException("must specify a video id");
        }
        
        var path = "/v3/downloads/videos/";
        path += this.id;
        var params = { auto_download: false };
        if (this.size) {
            params.size = this.size;
        }
        if (this.productId) {
            params.product_id = this.productId;
        }

        path += "?" + qs.stringify(params);

        var webHelper = new WebHelper(this.credentials, this.hostName);

        return webHelper.postQuery(path, null);      
    }
}

module.exports = VideoDownloads;