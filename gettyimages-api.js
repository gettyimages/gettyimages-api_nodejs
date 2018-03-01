"use strict";
var Credentials = require("./lib/credentials");
var Downloads = require("./lib/downloads");
var Images = require("./lib/images");
var SdkException = require("./lib/sdkexception");
var SearchImages = require("./lib/searchimages");
var SearchImagesCreative = require("./lib/searchimagescreative");
var SearchImagesEditorial = require("./lib/searchimageseditorial");
var Collections = require("./lib/collections");
var Countries = require("./lib/countries");
var Events = require("./lib/events");
var Videos = require("./lib/videos");

const _hostName = new WeakMap();
const _credentialOptions = new WeakMap();
const _credentials = new WeakMap();

class GettyImagesApi {
    
    get credentials() {
        return _credentialOptions.get(this);
    }
    set credentials(value) {
        _credentialOptions.set(this,value);
    }
    get creds() {
        return _credentials.get(this);
    }
    set creds(value) {
        _credentials.set(this,value);
    }
    
    get hostName() {
        return _hostName.get(this);
    }
    
    set hostName(value) {
        _hostName.set(this,value);
    }
    constructor(credentials, hostName) {
        if (!credentials.apiKey) {
            throw new SdkException("must specify an apiKey");
        }

        if (!credentials.apiSecret) {
            throw new SdkException("must specify an apiSecret");
        }

        if (!hostName) {
            hostName = "api.gettyimages.com";
        }

        this.hostName = hostName;
        this.credentials = credentials;
        this.creds = new Credentials(credentials.apiKey, credentials.apiSecret, credentials.username, credentials.password, credentials.refreshToken, hostName);
    }

    getAccessToken(next) {
        var creds = this.creds;
        
        if (creds.RefreshToken) {
            creds.refreshAccessToken(function (err, accessToken) {
                if (err) {
                    return next(err, null);
                } else {
                    return next(null, accessToken);
                }
            });
        } else {
            creds.getAccessToken(function (err, accessToken) {
                if (err) {
                    return next(err, null);
                } else {
                    return next(null, accessToken);
                }
            });
        }
    }

    images() {
        return new Images(this.creds, this.hostName);
    }

    videos() {
        return new Videos(this.creds, this.hostName);
    }

    searchimages() {
        return new SearchImages(this.creds, this.hostName);
    }

    searchimagescreative() {
        return new SearchImagesCreative(this.creds, this.hostName);
    }

    searchimageseditorial() {
        return new SearchImagesEditorial(this.creds, this.hostName);
    }

    collections() {
        return new Collections(this.creds, this.hostName);
    }

    countries() {
        return new Countries(this.creds, this.hostName);
    }

    events() {
        return new Events(this.creds, this.hostName);
    }

    downloads() {
        return new Downloads(this.creds, this.hostName);
    }
}

module.exports = GettyImagesApi;