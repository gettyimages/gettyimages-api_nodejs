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
            .get("/v3/search/videos")
            .query({ "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "editorial_video_types": "raw", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "format_available": "hd", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "frame_rates": ["24", "29.97"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "license_models": ["rightsmanaged", "royaltyfree"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/videos")
            .query({ "specific_people": "reggie jackson", "phrase": "cat" })
            .reply(200, {response : "response"});
});

test("SearchVideos: withPhrase will include phrase in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withCollectionCode will include codes in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withCollectionsFilterType("exclude").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withEditorialVideoType will include editorial_video_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withEditorialVideoType("raw").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withExcludeNudity().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withResponseField will include fields in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withResponseField(["asset_family", "id"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withFormatAvailable will include format_available in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withFormatAvailable("hd").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withFrameRate will include frame_rates in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withFrameRate(["24", "29.97"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withKeywordId will include keyword_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withKeywordId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withLicenseModel will include license_models in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withLicenseModel(["rightsmanaged", "royaltyfree"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withPage will include page in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withPage(3).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withPageSize will include page_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withPageSize(50).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withProductType will include product_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withSortOrder will include sort_order in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withSortOrder("newest").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchVideos: withSpecificPeople will include specific_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideos().withPhrase("cat").withSpecificPeople("reggie jackson").execute()).then(res => {
        t.is(res.response, "response");
    });
});