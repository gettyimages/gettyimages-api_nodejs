var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");

module.exports = function VideosDownloads(credentials, hostName) {
    var _id = null;
    var _size = null;

    this.withId = function (id) {
        _id = id;
        return this;
    };

    this.withSize = function (size) {
        _size = size;
        return this;
    };

    this.execute = function (next) {

        if (!_id) {
            throw new SdkException("must specify a video id");
        }

        var path = "/v3/downloads/videos/";
        path += _id;
        var params = { auto_download: false };
        if (_size) {
            params.size = _size;
        }

        path += "?" + qs.stringify(params);

        var webHelper = new WebHelper(credentials, hostName);
        webHelper.postQuery(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    };
};