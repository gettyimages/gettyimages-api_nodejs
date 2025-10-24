const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.beforeEach(() => {
    nock("https://authentication.gettyimages.com")
        .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: 1800
        });
    nock("https://api.gettyimages.com")
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
        .query({ "date_from": "2023-01-01", "phrase": "cat" })
        .reply(200, {response : "date_from"})
        .get("/v3/search/videos/editorial")
        .query({ "end_date": "2023-12-31", "phrase": "cat" })
        .reply(200, {response : "end_date"})
        .get("/v3/search/videos/editorial")
        .query({ "orientations": ["horizontal", "vertical"].join(","), "phrase": "cat" })
        .reply(200, {response : "orientations"})
        .get("/v3/search/videos/editorial")
        .query({"phrase":"monkey"})
        .reply(200,function(path, reqBody, cb) {
            cb(null,[200, {response: "accept-language", headers: this.req.headers}]);
        });
});

test("SearchVideosEditorial: withPhrase will include phrase in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").execute();
    t.is(res.response, "phrase");
});

test("SearchVideosEditorial: withAgeOfPeople will include age_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute();
    t.is(res.response, "age_of_people");
});

test("SearchVideosEditorial: withCollectionCode will include collection_codes in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute();
    t.is(res.response, "collection_codes");
});

test("SearchVideosEditorial: withCollectionsFilterType will include collections_filter_type in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withCollectionsFilterType("exclude").execute();
    t.is(res.response, "collections_filter_type");
});

test("SearchVideosEditorial: withEditorialVideoType will include editorial_video_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withEditorialVideoType("raw").execute();
    t.is(res.response, "editorial_video_types");
});

test("SearchVideosEditorial: withEntityUris will include entity_uris in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withEntityUris(["123", "456"]).execute();
    t.is(res.response, "entity_uris");
});

test("SearchVideosEditorial: withExcludeNudity will include exclude_nudity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withExcludeNudity(true).execute();
    t.is(res.response, "exclude_nudity");
});

test("SearchVideosEditorial: withResponseField will include fields in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withResponseField(["asset_family", "id"]).execute();
    t.is(res.response, "fields");
});

test("SearchVideosEditorial: withFormatAvailable will include format_available in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withFormatAvailable("hd").execute();
    t.is(res.response, "format_available");
});

test("SearchVideosEditorial: withFrameRate will include frame_rates in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withFrameRate(["24", "29.97"]).execute();
    t.is(res.response, "frame_rates");
});

test("SearchVideosEditorial: withKeywordId will include keyword_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withKeywordId([1234, 5678]).execute();
    t.is(res.response, "keyword_ids");
});

test("SearchVideosEditorial: withPage will include page in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withPage(3).execute();
    t.is(res.response, "page");
});

test("SearchVideosEditorial: withPageSize will include page_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withPageSize(50).execute();
    t.is(res.response, "page_size");
});

test("SearchVideosEditorial: withProductType will include product_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute();
    t.is(res.response, "product_types");
});

test("SearchVideosEditorial: withSortOrder will include sort_order in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withSortOrder("newest").execute();
    t.is(res.response, "sort_order");
});

test("SearchVideosEditorial: withSpecificPeople will include specific_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withSpecificPeople("reggie jackson").execute();
    t.is(res.response, "specific_people");
});

test("SearchVideosEditorial: withStartDate will include date_from in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withStartDate("2023-01-01").execute();
    t.is(res.response, "date_from");
});

test("SearchVideosEditorial: withEndDate will include end_date in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withEndDate("2023-12-31").execute();
    t.is(res.response, "end_date");
});

test("SearchVideosEditorial: withOrientation will include orientations in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withPhrase("cat").withOrientation(["horizontal", "vertical"]).execute();
    t.is(res.response, "orientations");
});

test ("SearchVideosEditorial: withAcceptLanguage will include the Accept-Language header in request", async t => {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideoseditorial().withAcceptLanguage("en-us").withPhrase("monkey").execute();
    var code = res[0];
    var body = res[1];
    t.is(code, 200);
    t.is(body.headers["accept-language"], "en-us");
    t.is(body.response, "accept-language");
});
