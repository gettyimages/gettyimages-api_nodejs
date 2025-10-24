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
        .get("/v3/search/videos")
        .query({ "phrase": "cat" })
        .reply(200, {response : "phrase"})
        .get("/v3/search/videos")
        .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
        .reply(200, {response : "age_of_people"})
        .get("/v3/search/videos")
        .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
        .reply(200, {response : "collection_codes"})
        .get("/v3/search/videos")
        .query({ "collections_filter_type": "exclude", "phrase": "cat" })
        .reply(200, {response : "collections_filter_type"})
        .get("/v3/search/videos")
        .query({ "editorial_video_types": "raw", "phrase": "cat" })
        .reply(200, {response : "editorial_video_types"})
        .get("/v3/search/videos")
        .query({ "exclude_nudity": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_nudity"})
        .get("/v3/search/videos")
        .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
        .reply(200, {response : "fields"})
        .get("/v3/search/videos")
        .query({ "format_available": "hd", "phrase": "cat" })
        .reply(200, {response : "format_available"})
        .get("/v3/search/videos")
        .query({ "frame_rates": ["24", "29.97"].join(","), "phrase": "cat" })
        .reply(200, {response : "frame_rates"})
        .get("/v3/search/videos")
        .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
        .reply(200, {response : "keyword_ids"})
        .get("/v3/search/videos")
        .query({ "license_models": ["rightsmanaged", "royaltyfree"].join(","), "phrase": "cat" })
        .reply(200, {response : "license_models"})
        .get("/v3/search/videos")
        .query({ "page": 3, "phrase": "cat" })
        .reply(200, {response : "page"})
        .get("/v3/search/videos")
        .query({ "page_size": 50, "phrase": "cat" })
        .reply(200, {response : "page_size"})
        .get("/v3/search/videos")
        .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
        .reply(200, {response : "product_types"})
        .get("/v3/search/videos")
        .query({ "sort_order": "newest", "phrase": "cat" })
        .reply(200, {response : "sort_order"})
        .get("/v3/search/videos")
        .query({ "specific_people": "reggie jackson", "phrase": "cat" })
        .reply(200, {response : "specific_people"});
});

test("SearchVideos: withPhrase will include phrase in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").execute();
    t.is(res.response, "phrase");
});

test("SearchVideos: withAgeOfPeople will include age_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute();
    t.is(res.response, "age_of_people");
});

test("SearchVideos: withCollectionCode will include collection_codes in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute();
    t.is(res.response, "collection_codes");
});

test("SearchVideos: withCollectionsFilterType will include collections_filter_type in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withCollectionsFilterType("exclude").execute();
    t.is(res.response, "collections_filter_type");
});

test("SearchVideos: withEditorialVideoType will include editorial_video_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withEditorialVideoType("raw").execute();
    t.is(res.response, "editorial_video_types");
});

test("SearchVideos: withExcludeNudity will include exclude_nudity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withExcludeNudity(true).execute();
    t.is(res.response, "exclude_nudity");
});

test("SearchVideos: withResponseField will include fields in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withResponseField(["asset_family", "id"]).execute();
    t.is(res.response, "fields");
});

test("SearchVideos: withFormatAvailable will include format_available in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withFormatAvailable("hd").execute();
    t.is(res.response, "format_available");
});

test("SearchVideos: withFrameRate will include frame_rates in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withFrameRate(["24", "29.97"]).execute();
    t.is(res.response, "frame_rates");
});

test("SearchVideos: withKeywordId will include keyword_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withKeywordId([1234, 5678]).execute();
    t.is(res.response, "keyword_ids");
});

test("SearchVideos: withLicenseModel will include license_models in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withLicenseModel(["rightsmanaged", "royaltyfree"]).execute();
    t.is(res.response, "license_models");
});

test("SearchVideos: withPage will include page in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withPage(3).execute();
    t.is(res.response, "page");
});

test("SearchVideos: withPageSize will include page_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withPageSize(50).execute();
    t.is(res.response, "page_size");
});

test("SearchVideos: withProductType will include product_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute();
    t.is(res.response, "product_types");
});

test("SearchVideos: withSortOrder will include sort_order in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withSortOrder("newest").execute();
    t.is(res.response, "sort_order");
});

test("SearchVideos: withSpecificPeople will include specific_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchvideos().withPhrase("cat").withSpecificPeople("reggie jackson").execute();
    t.is(res.response, "specific_people");
});