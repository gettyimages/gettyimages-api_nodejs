var api = require("../../gettyimages-api");
var nock = require("nock");
var expect = require("chai").expect;

function SetupAuthenticationMocking(nockInstance) {
    nockInstance.post("/oauth2/token", "client_id=apikey&client_secret=apisecret&username=username&password=password&grant_type=password")
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
        });
}

module.exports = function () {
    this.Given(/^a (.*) video search$/, function (searchtype, callback) {
        this.searchType = searchtype;
        callback();
    });

    this.Given(/^a search phrase$/, function (callback) {
        this.phrase = "monkey";
        callback();
    });

    this.When(/^the video search is executed$/, function (callback) {
        var context = this;
        var nockInstance = nock("https://api.gettyimages.com");
        SetupAuthenticationMocking(nockInstance);
        nockInstance.get(GetRouteForSearch(this)).query(GetQueryForSearch(this)).reply(200, {});
        var client = new api({ apiKey: this.apikey, apiSecret: this.apisecret, username: this.username, password: this.password });
        var search = client.search().videos();
        if (this.phrase) {
            search = search.withPhrase(this.phrase);
        }
        if (this.fields) {
            this.fields.forEach(function (element) {
                search = search.withResponseField(element);
            }, this);
        }
        if (this.ageOfPeople) {
            this.ageOfPeople.forEach(function (element) {
                search = search.withAgeOfPeople(element);
            }, this);
        }
        if (this.collectionCodes) {
            this.collectionCodes.forEach(function (element) {
                search = search.withCollectionCode(element);
            }, this);
        }
        if (this.excludeNudity) {
            search = search.withExcludeNudity(this.excludeNudity);
        }
        if (this.formatAvailable) {
            search = search.withFormatAvailable(this.formatAvailable);
        }
        if (this.productTypes) {
            this.productTypes.forEach(function(element) {
                search = search.withProductType(element);
            }, this);
        }
        if (this.specificPeople) {
            this.specificPeople.forEach(function(element) {
                search = search.withSpecificPerson(element);
            }, this);
        }
        if (this.licenseModels) {
            this.licenseModels.forEach(function(element) {
                search = search.withLicenseModel(element);
            }, this);
        }
        if (this.sortOrder) {
            search = search.withSortOrder(this.sortOrder);
        }
        if (this.pageNumber) {
            search = search.withPage(this.pageNumber);
        }
        if (this.pageSize) {
            search = search.withPageSize(this.pageSize);
        }
        
        search.execute(function (err, resp) {
            context.response = resp;
            context.error = err;
            callback();
        });
    });

    this.Then(/^the video search status is success$/, function (callback) {
        expect(this.error).to.be.null;
        expect(this.response).not.to.be.null;
        callback();
    });

    this.Given(/^largest_downloads field is specified$/, function (callback) {
        if (!this.fields) {
            this.fields = [];
        }
        this.fields.push("largest_downloads");
        callback();
    });

    this.Then(/^video search results are returned$/, function (callback) {
        // noop
        callback();
    });

    this.Then(/^the largest_download field is returned$/, function (callback) {
        // noop
        callback();
    });

    this.Given(/^age of people filter is specified$/, function (callback) {
        this.ageOfPeople = ["newborn", "child"];
        callback();
    });

    this.Given(/^collection codes filter is specified$/, function (callback) {
        this.collectionCodes = ["WRI", "ABC"];
        callback();
    });

    this.Given(/^exclude nudity filter is specified$/, function (callback) {
        this.excludeNudity = true;
        callback();
    });

    this.Given(/^format filter is specified$/, function (callback) {
        this.formatAvailable = "hd";
        callback();
    });

    this.Given(/^product type filter is specified$/, function (callback) {
        this.productTypes = ["premium_access", "easy_access"];
        callback();
    });

    this.Given(/^specific people filter is specified$/, function (callback) {
        this.specificPeople = ["person1", "person2"];
        callback();
    });

    this.Given(/^sort order is specified$/, function (callback) {
        this.sortOrder = "best_match";
        callback();
    });

    this.Given(/^page number is specified$/, function (callback) {
        this.pageNumber = 2;
        callback();
    });

    this.Given(/^page size is specified$/, function (callback) {
        this.pageSize = 5;
        callback();
    });

    this.Given(/^license model filter is specified$/, function (callback) {
        this.licenseModels = ["rights_ready", "royalty_free"];
        callback();
    });
    
    function GetRouteForSearch(context) {
        switch (context.imageFamily) {
            case "creative":
                return "/v3/search/videos/creative";
            case "editorial":
                return "/v3/search/videos/editorial";
            default:
                return "/v3/search/videos";
        }
    }

    function GetQueryForSearch(context) {
        var params = {};
        if (context.phrase) {
            params.phrase = context.phrase;
        }
        if (context.fields) {
            params.fields = context.fields.join(",");
        }
        if (context.ageOfPeople) {
            params.age_of_people = context.ageOfPeople.join(",");
        }
        if (context.collectionCodes) {
            params.collection_codes = context.collectionCodes.join(",");
        }
        if (context.excludeNudity) {
            params.exclude_nudity = context.excludeNudity;
        }
        if (context.formatAvailable) {
            params.format_available = context.formatAvailable;
        }
        if (context.productTypes) {
            params.product_types = context.productTypes.join(",");
        }
        if (context.specificPeople) {
            params.specific_people = context.specificPeople.join(",");
        }
        if (context.licenseModels) {
            params.license_models = context.licenseModels.join(",");
        }
        if (context.sortOrder) {
            params.sort_order = context.sortOrder;
        }
        if (context.pageNumber) {
            params.page = context.pageNumber;
        }
        if (context.pageSize) {
            params.page_size = context.pageSize;
        }
        
        return params;
    }
};