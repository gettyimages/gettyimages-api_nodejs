"use strict";
var Credentials = require("./lib/credentials");
var VideoDownloads = require("./lib/downloadsvideos");
var ImageDownloads = require("./lib/downloadsimages");
var Images = require("./lib/images");
var SdkException = require("./lib/sdkexception");
var SearchImages = require("./lib/searchimages");
var SearchImagesCreative = require("./lib/searchimagescreative");
var SearchImagesEditorial = require("./lib/searchimageseditorial");
var Collections = require("./lib/collections");
var Countries = require("./lib/countries");
var Events = require("./lib/events");
var Videos = require("./lib/videos");
var SearchVideos = require("./lib/searchvideos");
var SearchVideosCreative = require("./lib/searchvideoscreative");
var SearchVideosEditorial = require("./lib/searchvideoseditorial");
var CustomRequest = require("./lib/customrequest");

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
        this.creds = new Credentials(credentials.apiKey, credentials.apiSecret, credentials.username, credentials.password, credentials.refresh_token, hostName);
    }

    getAccessToken() {
        var creds = this.creds;
        
        if (creds.refreshToken) {
            return creds.refreshAccessToken();
        } else {
            return creds.getAccessToken();
        }
    }

    images() {
        return new Images(this.creds, this.hostName);
    }

    videos() {
        return new Videos(this.creds, this.hostName);
    }

    searchvideos() {
        return new SearchVideos(this.creds, this.hostName);
    }

    searchvideoscreative() {
        return new SearchVideosCreative(this.creds, this.hostName);
    }

    searchvideoseditorial() {
        return new SearchVideosEditorial(this.creds, this.hostName);
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

    downloadsvideos() {
        return new VideoDownloads(this.creds, this.hostName);
    }

    downloadsimages() {
        return new ImageDownloads(this.creds, this.hostName);
    }

    customrequest() {
        return new CustomRequest(this.creds, this.hostName);
    }
}

module.exports = GettyImagesApi;