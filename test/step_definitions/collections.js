var Api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.When(/^I retrieve collections$/, function (callback) {
        var testCredentials = { 
            apiKey: this.apikey,
            apiSecret: this.apisecret,
            username: this.username,
            password: this.password
        };
        
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
            .get("/v3/collections")
            .matchHeader("Authorization", "Bearer client_credentials_access_token")
            .reply(401, {
                Message: "Your access token does not authorize access to this resource."
            })
            .get("/v3/collections")
            .matchHeader("Authorization", "Bearer resource_owner_access_token")
            .reply(200, {});
        try
        {
            var client = new Api(testCredentials);
            client.collections().execute(function (err, response) {
                if (err) {
                    callback(err);
                } else {
                    this.response = response;
                    callback();
                }
            });
        }
        catch (err) {
            callback(err);
        }
    });

    this.Then(/^I recieve an error stating "([^"]*)"$/, function (arg1, callback) {
        callback();
    });

    this.Then(/^I receive collection details$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
};