var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.When(/^I request for any video to be downloaded$/, function (callback) {
        var context = this;
        context.id = "123";
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
            .post("/v3/downloads/videos/" + context.id)
            .query(getQuery(context))
            .reply(200, {});
        try {
            var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password })
                .downloads()
                .videos();

            if (context.id) {
                client = client.withId(context.id);
            }
            if (context.size) {
                client = client.withSize(context.size);
            }

            client.execute(function (err, response) {
                if (err) {
                    callback(err);
                }
                else {
                    context.response = response;
                    callback();
                }
            });
        }
        catch (error) {
            context.error = error;
            callback();
        }
    });

    this.Then(/^I receive an exception$/, function (callback) {
        if (this.error) {
            callback();
        }
        callback("Expected and exception");
    });

    this.Then(/^I receive not authorized message$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^the url for the video is returned$/, function (callback) {
        // noop
        callback();
    });

    this.Given(/^a download size$/, function (callback) {
        this.size = "HD1";
        callback();
    });
    function getQuery(context) {
        var params = {
            auto_download: false
        };
        if (context.size) {
            params.size = context.size;
        }
        return params;
    }
};