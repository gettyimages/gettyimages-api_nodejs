var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.When(/^I retrieve countries$/, function (callback) {
        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/countries")
            .matchHeader("Authorization", "Bearer client_credentials_access_token")
            .reply(200, {});

        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password });
        client.countries().execute(function (err, response) {
            if (err) {
                callback(err);
            } else {
                this.response = response;
                callback();
            }
        });
    });

    this.Then(/^I get a response back that has a list of countries$/, function (callback) {
        // noop
        callback();
    });

};