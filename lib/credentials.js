"use strict";

var querystring = require("querystring");
var WebHelper = require("./webhelper.js");

const _accessToken = new WeakMap();
const _apiKey = new WeakMap();
const _apiSecret = new WeakMap();
const _username = new WeakMap();
const _password = new WeakMap();
const _refreshToken = new WeakMap();
const _hostName = new WeakMap();

class Credentials {
    constructor(apiKey, apiSecret, username, password, refreshToken, hostName) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.username = username;
        this.password = password;
        this.refreshToken = refreshToken;
        this.hostName = hostName;
    }
    
    get apiKey() {
        return _apiKey.get(this);
    }
    set apiKey(value) {
        _apiKey.set(this,value);
    }
    
    get token() {
        return _accessToken.get(this);
    }    
    set token(value) {
        _accessToken.set(this,value);
    }

    get apiSecret() {
        return _apiSecret.get(this);
    }
    set apiSecret(value) {
        _apiSecret.set(this,value);
    }
    
    get password() {
        return _password.get(this);
    }
    set password(value) {
        _password.set(this,value);
    }

    get username() {
        return _username.get(this);
    }
    
    set username(value) {
        _username.set(this,value);
    }

    get refreshToken() {
        return _refreshToken.get(this);
    }
    set refreshToken(value) {
        _refreshToken.set(this,value);
    }
    
    get hostName() {
        return _hostName.get(this);
    }
    set hostName(value) {
        _hostName.set(this,value);
    }
    
    async getAccessToken() {
        var apiKey = this.apiKey;
        var apiSecret = this.apiSecret;
        var username = this.username;
        var password = this.password;
        var token = this.token;
        var hostName = this.hostName;
        
        
        if (!this.shouldRefreshToken()) {
            return token;
        }

        var params = {
            client_id: apiKey,
            client_secret: apiSecret,
            grant_type: "client_credentials"
        };

        if (username && password) {
            params.username = username;
            params.password = password;
            params.grant_type = "password";
        }

        var postData = querystring.stringify(params);
        var path = "/oauth2/token";

        var self = this;
        
        try {
            var webHelper = new WebHelper(self, hostName);
            var response = await webHelper.postForm(path, postData);
            var expireTime = new Date();
            expireTime.setSeconds(expireTime.getSeconds() + Number(response.expires_in));
            response.expiration = expireTime;
            self.token = response;
            
            return self.token;
        } catch (err) {
            return null;
        }
    }
    
    async refreshAccessToken() {
        var apiKey = this.apiKey;
        var apiSecret = this.apiSecret;
        var refreshToken = this.refreshToken;
        var hostName = this.hostName;
        
        var params = {
            client_id: apiKey,
            client_secret: apiSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token"
        };

        var postData = querystring.stringify(params);
        var path = "/oauth2/token";

        var self = this;

        try {
            var webHelper = new WebHelper(self, hostName);
            var response = await webHelper.postForm(path, postData);
            var expireTime = new Date();
            expireTime.setSeconds(expireTime.getSeconds() + Number(response.expires_in));
            response.expiration = expireTime;
            self.token = response;
            
            return self.token;
        } catch (err) {
            return null;
        }
    }
        


    shouldRefreshToken() {
        var token = this.token;
        
        if (token && token.expiration) {
            return new Date(Date.now() - 5000) > token.expiration;
        } else {
            return true;
        }
    }
}

module.exports = Credentials;
