var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.Given(/^I have an apikey$/, function (callback) {
        // this.apikey = process.env.GettyImagesApi_ApiKey;
        this.apikey = "apikey";
        callback();
    });

    this.Given(/^an api( )?secret$/, function (a, callback) {
        // this.apisecret = process.env.GettyImagesApi_ApiSecret;
        this.apisecret = "apisecret";
        callback();
    });

    this.Given(/^a username$/, function (callback) {
        // this.username = process.env.GettyImagesApi_UserName;
        this.username = "username";
        callback();
    });

    this.Given(/^a password$/, function (callback) {
        // this.password = process.env.GettyImagesApi_UserPassword;
        this.password = "password";
        callback();
    });

    this.When(/^I ask the sdk for an authentication token$/, function (callback) {
        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=password&username=username&password=password")
            .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800",
                refresh_token: "refreshtoken"
            })
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&refresh_token=refreshtoken&grant_type=refresh_token")
            .reply(200, {
                access_token: "accesstoken",
                token_type: "Bearer",
                expires_in: "1800"
            });

        var context = this;
        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password, refreshToken: this.refreshToken }, null);
        client.getAccessToken(function (err, response) {
            if (err) {
                callback(err);
            }
            context.accessToken = response.access_token;
            context.tokenType = response.token_type;
            context.refreshToken = response.refresh_token;
            context.expiresIn = response.expires_in;
            callback();
        });
    });

    this.Then(/^a(n)? (access )?token is returned$/, function (a, b, callback) {
        if (this.accessToken.length > 0) {
            callback();
        } else {
            callback(new Error("Expected an access token to be returned."));
        }
    });

    this.Given(/^a refresh token$/, function (callback) {
        this.refreshToken = "refreshtoken";
        callback();
    });

    this.When(/^I request an access token$/, function (callback) {
        var context = this;
        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password, refreshToken: this.refreshToken }, null);
        client.getAccessToken(function (err, response) {
            if (err) {
                callback(err);
            }
            context.accessToken = response.access_token;
            context.tokenType = response.token_type;
            context.expiresIn = response.expires_in;
            callback();
        });
    });
};
