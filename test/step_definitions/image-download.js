var Api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.When(/^I request for any image to be downloaded$/,{timeout: 0}, function (callback) {
        var context = this;
        var imageId = "123";
        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=password&username=username&password=password")
            .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/v3/downloads/images/" + imageId)
            .query({ auto_download: false })
            .reply(200, {})
            .post("/v3/downloads/images/" + imageId)
            .query({ auto_download: false, file_type: context.fileType })
            .reply(200, {})
            .post("/v3/downloads/images/" + imageId)
            .query({ auto_download: false, height: context.height })
            .reply(200, {});

        var client = new Api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password });
        try {
            var download = client.downloads().images();
        
            download = download.withId(imageId);

            if (context.fileType) {
                download = download.withFileType(context.fileType);
            }

            if (context.height) {
                download = download.withHeight(context.height);
            }

            download.execute(function (err, response) {
                if (err) {
                    callback(err);
                } else {
                    this.response = response;
                    callback();
                }
            });
        }
        catch (error) {
            context.error = error;
            callback();
        }
    });

    this.Then(/^I receive an error$/, function (callback) {
        if (this.error) {
            callback();
        }
        callback.fail();
    });

    this.Then(/^the url for the image is returned$/, function (callback) {
        if (this.error) {
            callback(this.error.toString());
        }
        callback();
    });

    this.Given(/^I specify a file type of (.*)$/, function (value, callback) {
        this.fileType = value;
        callback();
    });

    this.Then(/^the url has a (.*) file type$/, function (value, callback) {
        // noop
        callback();
    });

    this.Given(/^a pixel height$/, function (callback) {
        this.height = 1080;
        callback();
    });

};