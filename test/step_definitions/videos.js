var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.Given(/^a video id$/, function (callback) {
        this.ids = ["valid_id"];
        callback();
    });

    this.Given(/^caption field is specified$/, function (callback) {
        if (!this.fields) {
            this.fields = [];
        }
        this.fields.push("caption");
        callback();
    });

    this.Given(/^a non\-existent video id$/, function (callback) {
        this.ids = ["invalid_id"];
        callback();
    });

    this.Given(/^a list of video ids$/, function (callback) {
        this.ids = ["1", "2", "3", "4"];
        callback();
    });

    this.When(/^the video metadata request is executed$/, function (callback) {

        var context = this;
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
            .get(getPath(context))
            .query(getQuery(context))
            .reply(getReplyCode(context), {});

        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password }).videos();
        if (this.ids && this.ids.length == 1) {
            client.withId(this.ids[0]);
        }
        if (this.ids && this.ids.length > 1) {
            client.withIds(this.ids);
        }
        if (this.fields && this.fields.length > 0) {
            this.fields.forEach(function (element) {
                client.withResponseField(element);
            }, this);
        }


        client.execute(function (err, response) {
            if (err) {
                context.error = err;
                callback();
            } else {
                context.response = response;
                callback();
            }
        });
    });

    this.Then(/^a list of video metadata is returned$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^an error is returned$/, function (callback) {
        if (this.error) {
            callback();
        }

        callback("Expected an error");
    });

    this.Then(/^the error explains that the video was not found$/, function (callback) {
        if (this.error.statusCode === 404) {
            callback();
        }
        callback("Expected error to be 404");

    });

    this.Then(/^the status is success$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^the video metadata is returned$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^the caption field is returned$/, function (callback) {
        // noop
        callback();
    });

    function getPath(context) {
        var path = "/v3/videos";
        if (context.ids.length === 1) {
            path += "/" + context.ids[0];
        }
        return path;
    }

    function getQuery(context) {
        var params = {};
        if (context.ids && context.ids.length > 1) {
            params.ids = encodeURI(context.ids.join(","));
        }
        if (context.fields && context.fields.length > 0) {
            params.fields = encodeURI(context.fields.join(","));
        }

        return params;
    }

    function getReplyCode(context) {
        if (context.ids && context.ids[0] == "invalid_id") {
            return 404;
        } else {
            return 200;
        }
    }
};