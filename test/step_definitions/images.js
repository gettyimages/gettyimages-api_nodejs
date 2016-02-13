var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {

    this.Given(/^I have an image id I want details on$/, function (callback) {
        this.imageId = "1234";
        callback();
    });

    this.Given(/^I specify images field (.*)$/, function (field, callback) {
        if (!this.fields) {
            this.fields = [];
        }

        this.fields.push(field);
        callback();
    });

    this.When(/^I retrieve image details$/, function (callback) {
        getDetails(this, callback);
    });

    this.When(/^I retrieve details for the images$/, function (callback) {
        getDetails(this, callback);
    });

    this.Given(/^I have a list of image ids I want details on$/, function (callback) {
        this.imageIds = [];
        for (var i = 0; i < 4; i++) {
            this.imageIds[this.imageIds.length] = i.toString();
        }
        callback();
    });

    this.Then(/^I get a response back that has details for multiple images$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^I get a response back that has my image details$/, function (callback) {
        // noop
        callback();
    });

    this.Given(/^a non\-existent image id$/, function (callback) {
        this.imageId = "invalid_id";
        callback();
    });

    this.Then(/^the error explains that the image was not found$/, function (callback) {
        if (this.error && this.error.statusCode === 404) {
            callback();
        }
        callback("Expected error with status code 404");
    });


    function getDetails(context, callback) {
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
            .get("/v3/images/" + context.imageId)
            .query({ fields: context.fields ? encodeURI(context.fields.join(",")) : null })
            .reply(getReplyStatusCode(context), {})
            .get("/v3/images")
            .query({ ids: context.imageIds ? encodeURI(context.imageIds.join(",")) : null })
            .reply(getReplyStatusCode(context), {});

        var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password });
        var images = client.images();
        if (context.imageId) {
            images = images.withId(context.imageId);
        }

        if (context.imageIds) {
            images = images.withIds(context.imageIds);
        }

        if (context.fields) {
            context.fields.forEach(function (field) {
                images = images.withResponseField(field);
            }, this);
        }
        try
        {
            images.execute(function (err, response) {
                context.error = err;
                context.response = response;
                callback();
            });
        }
        catch (exception) {
            context.error = exception;
            callback();
        }
    }
    function getReplyStatusCode(context) {
        if (context.imageId === "invalid_id") {
            return 404;
        } else {
            return 200;
        }
    }
};