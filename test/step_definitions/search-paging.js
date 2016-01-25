var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.Given(/^I specify (.*) number of items per page$/, function (itemCount, callback) {
        this.pageSize = itemCount;
        callback();
    });

    this.Given(/^I want page (.*)$/, function (pageNumber, callback) {
        this.pageNumber = pageNumber;
        callback();
    });

    this.Given(/^I specify phrase (.*)$/, function (phrase, callback) {
        this.phrase = phrase;
        callback();
    });

    this.When(/^I retrieve the results$/, function (callback) {
        executeSearch(this, callback);
    });

    this.When(/^I retrieve page (\d+)$/, function (arg1, callback) {
        this.pageNumber = arg1;
        executeSearch(this, callback);
    });

    this.Then(/^the number of items returned matches (.*)$/, function (itemCount, callback) {
        // noop
        callback();
    });

    this.Then(/^the response has images$/, function (callback) {
        // noop
        callback();
    });

    function executeSearch(context, callback) {
        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/search/images/creative")
            .query(getSearchQuery(context))
            .reply(200, {});

        var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password })
            .search()
            .images()
            .creative();
        if (context.pageNumber) {
            client = client.withPage(context.pageNumber);
        }
        if (context.pageSize) {
            client = client.withPageSize(context.pageSize);
        }
        if (context.phrase) {
            client.withPhrase(context.phrase);
        }
        client.execute(function (err, response) {
            if (err) {
                callback(err);
            } else {
                context.response = response;
                callback();
            }
        });
    }
    function getSearchQuery(context) {
        var params = {};
        if (context.pageNumber) {
            params.page = context.pageNumber;
        }
        if (context.pageSize) {
            params.page_size = context.pageSize;
        }
        if (context.phrase) {
            params.phrase = context.phrase;
        }

        return params;
    }
};