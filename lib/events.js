var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");

module.exports = function Events(credentials, hostName) {

    var _ids = [];
    var _fields = [];

    this.withId = function (id) {
        _ids[_ids.length] = id;
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

        var path = "/v3/events";
        var params = {};
        if (_ids.length === 0) {
            throw new SdkException("must specify at least one event id");
        } else if (_ids.length === 1) {
            path += "/" + _ids[0];
        } else {
            params.ids = _ids.join(",");
        }

        if (_fields.length > 0) {
            params.fields = _fields.join(",");
        }

        if (params.ids || params.fields) {
            path += "?";
            path += querystring.stringify(params);
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