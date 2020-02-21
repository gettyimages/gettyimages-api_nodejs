const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.beforeEach(t=>{
    nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/search/videos/creative")
            .query({ "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "format_available": "hd", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "frame_rates": ["24", "29.97"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "license_models": ["rightsmanaged", "royaltyfree"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos/creative")
            .query({"phrase":"monkey"})
            .reply(200,function(path, reqBody, cb) {
                cb(null,[200, {response: "response", headers: this.req.headers}]);
             });
});

test("SearchVideosCreative: withPhrase will include phrase in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withCollectionCode will include codes in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withCollectionsFilterType("exclude").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withExcludeNudity().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withResponseField will include fields in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withResponseField(["asset_family", "id"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withFormatAvailable will include format_available in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withFormatAvailable("hd").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withFrameRate will include frame_rates in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withFrameRate(["24", "29.97"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withKeywordId will include keyword_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withKeywordId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withLicenseModel will include license_models in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withLicenseModel(["rightsmanaged", "royaltyfree"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withPage will include page in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withPage(3).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withPageSize will include page_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withPageSize(50).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withProductType will include product_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideosCreative: withSortOrder will include sort_order in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withPhrase("cat").withSortOrder("newest").execute()).then(res => {
        t.is(res.response, "response");
    });
});


test ("SearchVideosCreative: withAcceptLanguage will include the Accept-Languaged header in request", t=> {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoscreative().withAcceptLanguage("en-us").withPhrase("monkey").execute().then(res => {
        var code = res[0];
        var body = res[1];
        t.is(code, 200);
        t.is(body.headers["accept-language"],"en-us");
        t.is(body.response,"response");
    }));
});
