"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

const _ids = new WeakMap();
const _fields = new WeakMap();

class Videos extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.ids = [];
        this.fields = [];
    }
    
    set ids(value) {
        _ids.set(this,value);
    }
    
    get ids() {
        return _ids.get(this);
    }
    
    set fields(value) {
        _fields.set(this,value);
    }
    
    get fields() {
        return _fields.get(this);
    }
    
    withId(id) {
        this.ids[this.ids.length] = id;
        return this;
    }
    
    withIds(ids) {
        this.ids = this.ids.concat(ids);
        return this;
    }
    
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }
    
    execute(next) {
        var path = "/v3/videos";
        var params = null;

        if (this.ids.length === 0) {
            throw new SdkException("must specify at least one video id");
        } else if (this.ids.length === 1) {
            path += "/" + this.ids[0];
        } else {
            params = {};
            params.ids = this.ids.join(",");
        }

        if (this.fields.length > 0) {
            if (!params) {
                params = {};
            }

            params.fields = this.fields.join(",");
        }

        if (params) {
            path += "?" + querystring.stringify(params);
        }

        var webHelper = new WebHelper(this.credentials, this.hostName);
        return webHelper.get(path);
    }
}

module.exports = Videos;