const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.beforeEach(() => {
    nock("https://authentication.gettyimages.com")
        .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: "1800"
        });
    nock("https://api.gettyimages.com")
        .get("/v3/search/videos/creative")
        .query({ "phrase": "cat" })
        .reply(200, {response : "phrase"})
        .get("/v3/search/videos/creative")
        .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
        .reply(200, {response : "age_of_people"})
        .get("/v3/search/videos/creative")
        .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
        .reply(200, {response : "collection_codes"})
        .get("/v3/search/videos/creative")
        .query({ "collections_filter_type": "exclude", "phrase": "cat" })
        .reply(200, {response : "collections_filter_type"})
        .get("/v3/search/videos/creative")
        .query({ "exclude_editorial_use_only": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_editorial_use_only"})
        .get("/v3/search/videos/creative")
        .query({ "exclude_nudity": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_nudity"})
        .get("/v3/search/videos/creative")
        .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
        .reply(200, {response : "fields"})
        .get("/v3/search/videos/creative")
        .query({ "format_available": "hd", "phrase": "cat" })
        .reply(200, {response : "format_available"})
        .get("/v3/search/videos/creative")
        .query({ "frame_rates": ["24", "29.97"].join(","), "phrase": "cat" })
        .reply(200, {response : "frame_rates"})
        .get("/v3/search/videos/creative")
        .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
        .reply(200, {response : "keyword_ids"})
        .get("/v3/search/videos/creative")
        .query({ "license_models": ["rightsmanaged", "royaltyfree"].join(","), "phrase": "cat" })
        .reply(200, {response : "license_models"})
        .get("/v3/search/videos/creative")
        .query({ "page": 3, "phrase": "cat" })
        .reply(200, {response : "page"})
        .get("/v3/search/videos/creative")
        .query({ "page_size": 50, "phrase": "cat" })
        .reply(200, {response : "page_size"})
        .get("/v3/search/videos/creative")
        .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
        .reply(200, {response : "product_types"})
        .get("/v3/search/videos/creative")
        .query({ "safe_search": "true", "phrase": "cat" })
        .reply(200, {response : "safe_search"})
        .get("/v3/search/videos/creative")
        .query({ "sort_order": "newest", "phrase": "cat" })
        .reply(200, {response : "sort_order"})
        .get("/v3/search/videos/creative")
        .query({"phrase":"monkey"})
        .reply(200,function(path, reqBody, cb) {
            cb(null,[200, {response: "accept-language", headers: this.req.headers}]);
        });
});

test("SearchVideosCreative: withPhrase will include phrase in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").execute();
    t.is(res.response, "phrase");
});

test("SearchVideosCreative: withAgeOfPeople will include age_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute();
    t.is(res.response, "age_of_people");
});

test("SearchVideosCreative: withCollectionCode will include collection_codes in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute();
    t.is(res.response, "collection_codes");
});

test("SearchVideosCreative: withCollectionsFilterType will include collections_filter_type in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withCollectionsFilterType("exclude").execute();
    t.is(res.response, "collections_filter_type");
});

test("SearchVideosCreative: withExcludeEditorialUseOnly will include exclude_editorial_use_only in query", async t => {
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withExcludeEditorialUseOnly(true).execute();
    t.is(res.response, "exclude_editorial_use_only");
});

test("SearchVideosCreative: withExcludeNudity will include exclude_nudity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withExcludeNudity(true).execute();
    t.is(res.response, "exclude_nudity");
});

test("SearchVideosCreative: withResponseField will include fields in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withResponseField(["asset_family", "id"]).execute();
    t.is(res.response, "fields");
});

test("SearchVideosCreative: withFormatAvailable will include format_available in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withFormatAvailable("hd").execute();
    t.is(res.response, "format_available");
});

test("SearchVideosCreative: withFrameRate will include frame_rates in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withFrameRate(["24", "29.97"]).execute();
    t.is(res.response, "frame_rates");
});

test("SearchVideosCreative: withKeywordId will include keyword_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withKeywordId([1234, 5678]).execute();
    t.is(res.response, "keyword_ids");
});

test("SearchVideosCreative: withLicenseModel will include license_models in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withLicenseModel(["rightsmanaged", "royaltyfree"]).execute();
    t.is(res.response, "license_models");
});

test("SearchVideosCreative: withPage will include page in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withPage(3).execute();
    t.is(res.response, "page");
});

test("SearchVideosCreative: withPageSize will include page_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withPageSize(50).execute();
    t.is(res.response, "page_size");
});

test("SearchVideosCreative: withProductType will include product_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute();
    t.is(res.response, "product_types");
});

test("SearchVideosCreative: withSafeSearch will include safe_search in query", async t => {
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withSafeSearch(true).execute();
    t.is(res.response, "safe_search");
});

test("SearchVideosCreative: withSortOrder will include sort_order in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withPhrase("cat").withSortOrder("newest").execute();
    t.is(res.response, "sort_order");
});


test ("SearchVideosCreative: withAcceptLanguage will include the Accept-Language header in request", async t => {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoscreative().withAcceptLanguage("en-us").withPhrase("monkey").execute();
    var code = res[0];
    var body = res[1];
    t.is(code, 200);
    t.is(body.headers["accept-language"], "en-us");
    t.is(body.response, "accept-language");
});
