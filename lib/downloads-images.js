var qs = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");

module.exports = function ImagesDownloads(credentials, hostName) {
    var _id = null;
    var _fileType = null;
    var _height = null;

    this.withId = function (id) {
        _id = id;
        return this;
    };

    this.withFileType = function (fileType) {
        _fileType = fileType;
        return this;
    };

    this.withHeight = function (height) {
        _height = height;
        return this;
    };

    this.execute = function (next) {

        if (!_id) {
            throw new SdkException("must specify an image id");
        }

        var path = "/v3/downloads/images/";
        path += _id;
        var params = { auto_download: false };
        if (_fileType) {
            params.file_type = _fileType;
        }
        if (_height) {
            params.height = _height;
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