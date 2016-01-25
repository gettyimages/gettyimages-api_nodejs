var api = require("../../gettyimages-api");
var nock = require("nock");

module.exports = function () {

    this.When(/^I configure my search for (.*) images$/, function (imageFamily, callback) {
        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password }).search().images();
        this.imageFamily = imageFamily;
        if (imageFamily === "creative") {
            this.search = client.creative();
        } else if (imageFamily == "editorial") {
            this.search = client.editorial();
        } else {
            this.search = client;
        }
        callback();
    });

    this.When(/^I search$/, function (callback) {
        search(this, "", callback);
    });

    this.Given(/^I search for (.*)$/, function (phrase, callback) {
        search(this, phrase, callback);
    });

    function search(context, phrase, callback) {
        if (context.imageFamily === "blended") {
            context.imageFamily = "";
        } else if (context.imageFamily) {
            context.imageFamily = "/" + context.imageFamily;
        }

        nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&username=username&password=password&grant_type=password")
            .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=password&username=username&password=password")
            .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/search/images/editorial")
            .query({ "editorial_segments": context.editorialSegment, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "graphical_styles": context.graphicalStyle, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "embed_content_only": context.embedOnly, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "exclude_nudity": context.excludeNudity, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "license_models": context.licenseModel, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "orientations": context.orientation, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "age_of_people": context.ageOfPeople, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "artists": context.artist, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "collection_codes": context.collectionCodes, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "collections_filter_type": context.collectionsFilterType, "collection_codes": context.collectionCodes, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "compositions": context.composition, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "date_from": context.dateFrom, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "date_to": context.dateTo, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "event_ids": context.eventId })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "ethnicity": context.ethnicity, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "file_types": context.fileType, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ phrase: phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ keyword_ids: context.keywordId })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "number_of_people": context.numberOfPeople, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ phrase: phrase, fields: context.searchField })
            .reply(200, {})
            .get("/v3/search/images")
            .query({ "specific_people": context.specificPeople, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "specific_people": context.specificPeople, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images" + context.imageFamily)
            .query({ "product_types": context.productType, "phrase": phrase })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "prestige_content_only": context.prestigeContentOnly, "phrase": phrase })
            .reply(200, {});

        var search = context.search;

        if (phrase) {
            search = search.withPhrase(phrase);
        }

        if (context.field) {
            search = search.withField(context.field);
        }

        if (context.editorialSegment) {
            search = search.withEditorialSegment(context.editorialSegment);
        }

        if (context.graphicalStyle) {
            search = search.withGraphicalStyle(context.graphicalStyle);
        }

        if (context.embedOnly) {
            search = search.withEmbedContentOnly(context.embedOnly);
        }

        if (context.excludeNudity) {
            search = search.withExcludeNudity(context.excludeNudity);
        }

        if (context.licenseModel) {
            search = search.withLicenseModel(context.licenseModel);
        }

        if (context.orientation) {
            search = search.withOrientation(context.orientation);
        }

        if (context.ageOfPeople) {
            search = search.withAgeOfPeople(context.ageOfPeople);
        }

        if (context.artist) {
            search = search.withArtist(context.artist);
        }

        if (context.collectionCodes) {
            search = search.withCollectionCode(context.collectionCodes);
        }

        if (context.collectionsFilterType) {
            search = search.withCollectionsFilterType(context.collectionsFilterType);
        }

        if (context.composition) {
            search = search.withComposition(context.composition);
        }

        if (context.dateFrom) {
            search = search.withDateFrom(context.dateFrom);
        }

        if (context.dateTo) {
            search = search.withDateTo(context.dateTo);
        }

        if (context.eventId) {
            search = search.withEventId(context.eventId);
        }

        if (context.ethnicity) {
            search = search.withEthnicity(context.ethnicity);
        }

        if (context.fileType) {
            search = search.withFileType(context.fileType);
        }

        if (context.keywordId) {
            search = search.withKeywordId(context.keywordId);
        }

        if (context.numberOfPeople) {
            search = search.withNumberOfPeople(context.numberOfPeople);
        }

        if (context.productType) {
            search = search.withProductType(context.productType);
        }

        if (context.specificPeople) {
            search = search.withSpecificPerson(context.specificPeople);
        }

        if (context.prestigeContentOnly) {
            search = search.withPrestigeContentOnly(context.prestigeContentOnly);
        }

        search.execute(function (err, response) {
            if (err) {
                callback(err);
            } else {
                context.searchResponse = response;
                callback();
            }
        });
    }

    this.Then(/^I get a response back that has my images$/, function (callback) {
        callback();
    });

    this.Given(/^I specify that I only want to return (.*) with my search results$/, function (fields, callback) {
        this.searchField = fields;
        callback();
    });

    this.Then(/^only required return fields plus (.*) are returned$/, function (fields, callback) {
        // nock will error if the correct fields are not passed to the http request
        callback();
    });

    this.Given(/^I specify (.*) editorial segment$/, function (segment, callback) {
        this.editorialSegment = segment.toLowerCase();
        callback();
    });

    this.Given(/^I specify a graphical (.*)$/, function (style, callback) {
        this.graphicalStyle = style.toLowerCase();
        callback();
    });

    this.When(/^I specify I want only embeddable images$/, function (callback) {
        this.embedOnly = true;
        callback();
    });

    this.When(/^I specify I want to exclude images containing nudity$/, function (callback) {
        this.excludeNudity = true;
        callback();
    });

    this.Given(/^I specify a license model (.*)$/, function (model, callback) {
        this.licenseModel = model.toLowerCase();
        callback();
    });

    this.Given(/^I specify an orientation (.*)$/, function (value, callback) {
        this.orientation = value.toLowerCase();
        callback();
    });

    this.Given(/^I specify a (.*) age of people$/, function (value, callback) {
        this.ageOfPeople = value.toLowerCase();
        callback();
    });

    this.Given(/^I specify an artist$/, function (callback) {
        this.artist = "some artist";
        callback();
    });

    this.Given(/^I specify a collection code$/, function (callback) {
        this.collectionCodes = "some code";
        callback();
    });

    this.Given(/^I specify a (.*) collection filter type$/, function (filterValue, callback) {
        this.collectionsFilterType = filterValue;
        callback();
    });

    this.Given(/^I specify a (.*) collection code$/, function (codeValue, callback) {
        this.collectionCodes = codeValue;
        callback();
    });

    this.Given(/^I specify a (.*) composition$/, function (value, callback) {
        this.composition = value;
        callback();
    });

    this.Given(/^I specify an start date$/, function (callback) {
        this.dateFrom = Date.now();
        callback();
    });

    this.Given(/^I specify an (.*) ethnicity$/, function (value, callback) {
        this.ethnicity = value;
        callback();
    });

    this.Given(/^I specify a (.*) file type$/, function (value, callback) {
        this.fileType = value;
        callback();
    });

    this.Given(/^I specify a keyword id$/, function (callback) {
        this.keywordId = 1234;
        callback();
    });

    this.Given(/^I specify a (.*) number of people in image$/, function (value, callback) {
        this.numberOfPeople = value;
        callback();
    });

    this.Given(/^I specify a (.*) product type$/, function (productType, callback) {
        this.productType = productType;
        callback();
    });

    this.Given(/^I specify an end date$/, function (callback) {
        this.dateTo = Date.now();
        callback();
    });

    this.Given(/^I specify a event id$/, function (callback) {
        this.eventId = 1;
        callback();
    });

    this.Given(/^I specify a specific person$/, function (callback) {
        this.specificPeople = "some person";
        callback();
    });

    this.When(/^I specify I want only prestige images$/, function (callback) {
        this.prestigeContentOnly = true;
        callback();
    });

};