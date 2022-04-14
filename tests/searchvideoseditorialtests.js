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
            .get("/v3/search/videos/editorial")
            .query({ "phrase": "cat" })
            .reply(200, {response : "phrase"})
            .get("/v3/search/videos/editorial")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {response : "age_of_people"})
            .get("/v3/search/videos/editorial")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {response : "collection_codes"})
            .get("/v3/search/videos/editorial")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {response : "collections_filter_type"})
            .get("/v3/search/videos/editorial")
            .query({ "editorial_video_types": "raw", "phrase": "cat" })
            .reply(200, {response : "editorial_video_types"})
            .get("/v3/search/videos/editorial")
            .query({ "entity_uris": ["123", "456"].join(","), "phrase": "cat" })
            .reply(200, {response : "entity_uris"})
            .get("/v3/search/videos/editorial")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {response : "exclude_nudity"})
            .get("/v3/search/videos/editorial")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {response : "fields"})
            .get("/v3/search/videos/editorial")
            .query({ "format_available": "hd", "phrase": "cat" })
            .reply(200, {response : "format_available"})
            .get("/v3/search/videos/editorial")
            .query({ "frame_rates": ["24", "29.97"].join(","), "phrase": "cat" })
            .reply(200, {response : "frame_rates"})
            .get("/v3/search/videos/editorial")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "keyword_ids"})
            .get("/v3/search/videos/editorial")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {response : "page"})
            .get("/v3/search/videos/editorial")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {response : "page_size"})
            .get("/v3/search/videos/editorial")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {response : "product_types"})
            .get("/v3/search/videos/editorial")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {response : "sort_order"})
            .get("/v3/search/videos/editorial")
            .query({ "specific_people": "reggie jackson", "phrase": "cat" })
            .reply(200, {response : "specific_people"})
            .get("/v3/search/videos/editorial")
            .query({"phrase":"monkey"})
            .reply(200,function(path, reqBody, cb) {
                cb(null,[200, {response: "accept-language", headers: this.req.headers}]);
             });
});

test("SearchVideosEditorial: withPhrase will include phrase in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").execute()).then(res => {
        t.is(res.response, "phrase");
    });
});

test("SearchVideosEditorial: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute()).then(res => {
        t.is(res.response, "age_of_people");
    });
});

test("SearchVideosEditorial: withCollectionCode will include collection_codes in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute()).then(res => {
        t.is(res.response, "collection_codes");
    });
});

test("SearchVideosEditorial: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withCollectionsFilterType("exclude").execute()).then(res => {
        t.is(res.response, "collections_filter_type");
    });
});

test("SearchVideosEditorial: withEditorialVideoType will include editorial_video_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withEditorialVideoType("raw").execute()).then(res => {
        t.is(res.response, "editorial_video_types");
    });
});

test("SearchVideosEditorial: withEntityUris will include entity_uris in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withEntityUris(["123", "456"]).execute()).then(res => {
        t.is(res.response, "entity_uris");
    });
});

test("SearchVideosEditorial: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withExcludeNudity(true).execute()).then(res => {
        t.is(res.response, "exclude_nudity");
    });
});

test("SearchVideosEditorial: withResponseField will include fields in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withResponseField(["asset_family", "id"]).execute()).then(res => {
        t.is(res.response, "fields");
    });
});

test("SearchVideosEditorial: withFormatAvailable will include format_available in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withFormatAvailable("hd").execute()).then(res => {
        t.is(res.response, "format_available");
    });
});

test("SearchVideosEditorial: withFrameRate will include frame_rates in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withFrameRate(["24", "29.97"]).execute()).then(res => {
        t.is(res.response, "frame_rates");
    });
});

test("SearchVideosEditorial: withKeywordId will include keyword_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withKeywordId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "keyword_ids");
    });
});

test("SearchVideosEditorial: withPage will include page in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withPage(3).execute()).then(res => {
        t.is(res.response, "page");
    });
});

test("SearchVideosEditorial: withPageSize will include page_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withPageSize(50).execute()).then(res => {
        t.is(res.response, "page_size");
    });
});

test("SearchVideosEditorial: withProductType will include product_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute()).then(res => {
        t.is(res.response, "product_types");
    });
});

test("SearchVideosEditorial: withSortOrder will include sort_order in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withSortOrder("newest").execute()).then(res => {
        t.is(res.response, "sort_order");
    });
});

test("SearchVideosEditorial: withSpecificPeople will include specific_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withPhrase("cat").withSpecificPeople("reggie jackson").execute()).then(res => {
        t.is(res.response, "specific_people");
    });
});

test ("SearchVideosEditorial: withAcceptLanguage will include the Accept-Language header in request", t=> {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchvideoseditorial().withAcceptLanguage("en-us").withPhrase("monkey").execute().then(res => {
        var code = res[0];
        var body = res[1];
        t.is(code, 200);
        t.is(body.headers["accept-language"],"en-us");
        t.is(body.response,"accept-language");
    }));
});
