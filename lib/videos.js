var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");

module.exports = function Videos(credentials, hostName) {
    var _ids = [];
    var _fields = [];

    this.withId = function (id) {
        _ids.push(id);
        return this;
    };

    this.withIds = function (ids) {
        _ids = _ids.concat(ids);
        return this;
    };

    this.withResponseField = function (field) {
        _fields[_fields.length] = field;
        return this;
    };

    this.execute = function (next) {
        var path = "/v3/videos";
        var params = null;

        if (_ids.length === 0) {
            throw new SdkException("must specify at least one video id");
        } else if (_ids.length === 1) {
            path += "/" + _ids[0];
        } else {
            params = {};
            params.ids = _ids.join(",");
        }

        if (_fields.length > 0) {
            if (!params) {
                params = {};
            }

            params.fields = _fields.join(",");
        }

        if (params) {
            path += "?" + querystring.stringify(params);
        }

        var webHelper = new WebHelper(credentials, hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    };
};