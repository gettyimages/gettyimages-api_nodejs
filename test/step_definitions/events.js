var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {
    this.Given(/^I have an event id I want details on$/, function (callback) {
        this.eventId = 123;
        callback();
    });

    this.When(/^I retrieve event details$/, function (callback) {
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
                expires_in: "1800"
            })
            .get("/v3/events/" + context.eventId)
            .query(context.fields ? { "fields": encodeURI(context.fields.join(",")) } : null)
            .reply(200, {});
        var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password });
        var events = client.events();
        events = events.withIds(context.eventId);
        if (context.fields) {
            context.fields.forEach(function (element) {
                events = events.withResponseField(element);
            }, this);
        }

        events.execute(function (err, response) {
            if (err) {
                callback(err);
            } else {
                context.eventResponse = response;
                callback();
            }
        });
    });

    this.Then(/^I get a response back that has my event$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Given(/^I specify field (.*)$/, function (field, callback) {
        if (!this.fields) {
            this.fields = [];
        }
        this.fields[this.fields.length] = field;
        callback();
    });

    this.Then(/^the response contains (.*)$/, function (value, callback) {
        //noop - nock will ensure this is true
        callback();
    });

    this.Given(/^I have a list of event ids I want details on$/, function (callback) {
        this.eventIds = [];
        for (var i = 0; i < 4; i++) {
            this.eventIds.push(i);
        }
        callback();
    });

    this.When(/^I retrieve details for the events$/, function (callback) {
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
                expires_in: "1800"
            })
            .get("/v3/events")
            .query({ "ids": encodeURI(context.eventIds.join(",")) })
            .reply(200, {});
        var client = new api({ apiKey: context.apikey, apiSecret: context.apisecret, username: context.username, password: context.password });
        var events = client.events();

        events = events.withIds(context.eventIds);
        if (context.fields) {
            context.fields.forEach(function (element) {
                events = events.withResponseField(element);
            }, this);
        }
        events.execute(function (err, response) {
            if (err) {
                callback(err);
            } else {
                context.eventResponse = response;
                callback();
            }
        });
    });

    this.Then(/^I get a response back that has details for multiple events$/, function (callback) {
        //noop
        callback();
    });


};