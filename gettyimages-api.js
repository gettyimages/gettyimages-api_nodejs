var Credentials = require("./lib/credentials");
var Downloads = require("./lib/downloads");
var Images = require("./lib/images");
var SdkException = require("./lib/sdkexception");
var Search = require("./lib/search");
var Collections = require("./lib/collections");
var Countries = require("./lib/countries");
var Events = require("./lib/events");
var Videos = require("./lib/videos");

module.exports = function GettyImagesApi(credentials, hostName) {

    if (!credentials.apiKey) {
        throw new SdkException("must specify an apiKey");
    }

    if (!credentials.apiSecret) {
        throw new SdkException("must specify an apiSecret");
    }

    if (!hostName) {
        hostName = "api.gettyimages.com";
    }

    var creds = new Credentials(credentials.apiKey, credentials.apiSecret, credentials.username, credentials.password, credentials.refreshToken, hostName);

    this.getAccessToken = function (next) {
        if (creds.getRefreshToken()) {
            creds.refreshAccessToken(function (err, accessToken) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, accessToken);
                }
            });
        } else {
            creds.getAccessToken(function (err, accessToken) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, accessToken);
                }
            });
        }
    };

    this.images = function () {
        return new Images(creds, hostName);
    };
    
    this.videos = function () {
        return new Videos(creds, hostName);
    };

    this.search = function () {
        return new Search(creds, hostName);
    };

    this.collections = function () {
        return new Collections(creds, hostName);
    };

    this.countries = function () {
        return new Countries(creds, hostName);
    };

    this.events = function () {
        return new Events(creds, hostName);
    };

    this.downloads = function () {
        return new Downloads(creds, hostName);
    };
};