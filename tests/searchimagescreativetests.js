const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.beforeEach( () => {
    nock("https://api.gettyimages.com")
        .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: "1800"
        })
        .get("/v3/search/images/creative")
        .query({ "phrase": "cat" })
        .reply(200, {response : "phrase"})
        .get("/v3/search/images/creative")
        .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
        .reply(200, {response : "age_of_people"})
        .get("/v3/search/images/creative")
        .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
        .reply(200, {response : "artists"})
        .get("/v3/search/images/creative")
        .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
        .reply(200, {response : "collection_codes"})
        .get("/v3/search/images/creative")
        .query({ "collections_filter_type": "exclude", "phrase": "cat" })
        .reply(200, {response : "collections_filter_type"})
        .get("/v3/search/images/creative")
        .query({ "color": "#002244", "phrase": "cat" })
        .reply(200, {response : "color"})
        .get("/v3/search/images/creative")
        .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
        .reply(200, {response : "compositions"})
        .get("/v3/search/images/creative")
        .query({ "embed_content_only": "true", "phrase": "cat" })
        .reply(200, {response : "embed_content_only"})
        .get("/v3/search/images/creative")
        .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
        .reply(200, {response : "ethnicity"})
        .get("/v3/search/images/creative")
        .query({ "exclude_editorial_use_only": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_editorial_use_only"})
        .get("/v3/search/images/creative")
        .query({ "exclude_nudity": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_nudity"})
        .get("/v3/search/images/creative")
        .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
        .reply(200, {response : "fields"})
        .get("/v3/search/images/creative")
        .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
        .reply(200, {response : "file_types"})
        .get("/v3/search/images/creative")
        .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
        .reply(200, {response : "graphical_styles"})
        .get("/v3/search/images/creative")
        .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
        .reply(200, {response : "keyword_ids"})
        .get("/v3/search/images/creative")
        .query({ "minimum_size": "small", "phrase": "cat" })
        .reply(200, {response : "minimum_size"})
        .get("/v3/search/images/creative")
        .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
        .reply(200, {response : "number_of_people"})
        .get("/v3/search/images/creative")
        .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
        .reply(200, {response : "orientations"})
        .get("/v3/search/images/creative")
        .query({ "page": 3, "phrase": "cat" })
        .reply(200, {response : "page"})
        .get("/v3/search/images/creative")
        .query({ "page_size": 50, "phrase": "cat" })
        .reply(200, {response : "page_size"})
        .get("/v3/search/images/creative")
        .query({ "prestige_content_only": "true", "phrase": "cat" })
        .reply(200, {response : "prestige_content_only"})
        .get("/v3/search/images/creative")
        .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
        .reply(200, {response : "product_types"})
        .get("/v3/search/images/creative")
        .query({ "safe_search": "true", "phrase": "cat" })
        .reply(200, {response : "safe_search"})
        .get("/v3/search/images/creative")
        .query({ "sort_order": "newest", "phrase": "cat" })
        .reply(200, {response : "sort_order"})
        .get("/v3/search/images/creative")
        .query({"phrase":"monkey"})
        .reply(200,function(path, reqBody, cb) {
            cb(null,[200, {response: "accept-language", headers: this.req.headers}]);
        });
});

test("SearchImagesCreative: withPhrase will include phrase in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").execute();
    t.is(res.response, "phrase");
});

test("SearchImagesCreative: withAgeOfPeople will include age_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute();
    t.is(res.response, "age_of_people");
});

test("SearchImagesCreative: withArtist will include artists in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute();
    t.is(res.response, "artists");
});

test("SearchImagesCreative: withCollectionCode will include collection_codes in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute();
    t.is(res.response, "collection_codes");
});

test("SearchImagesCreative: withCollectionsFilterType will include collections_filter_type in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withCollectionsFilterType("exclude").execute();
    t.is(res.response, "collections_filter_type");
});

test("SearchImagesCreative: withColor will include color in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withColor("#002244").execute();
    t.is(res.response, "color");
});

test("SearchImagesCreative: withCompostition will include compostition in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withComposition(["abstract", "headshot"]).execute();
    t.is(res.response, "compositions");
});

test("SearchImagesCreative: withEmbedContentOnly will include embed_content_only in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withEmbedContentOnly(true).execute();
    t.is(res.response, "embed_content_only");
});

test("SearchImagesCreative: withEthnicity will include ethnicity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withEthnicity(["black", "japanese"]).execute();
    t.is(res.response, "ethnicity");
});

test("SearchImagesCreative: withExcludeEditorialUseOnly will include exclude_editorial_use_only in query", async t => {
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withExcludeEditorialUseOnly(true).execute();
    t.is(res.response, "exclude_editorial_use_only");
});

test("SearchImagesCreative: withExcludeNudity will include exclude_nudity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withExcludeNudity(true).execute();
    t.is(res.response, "exclude_nudity");
});

test("SearchImagesCreative: withResponseField will include fields in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withResponseField(["asset_family", "id"]).execute();
    t.is(res.response, "fields");
});

test("SearchImagesCreative: withFileType will include file_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withFileType(["eps", "jpg"]).execute();
    t.is(res.response, "file_types");
});

test("SearchImagesCreative: withGraphicalStyle will include graphical_styles in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute();
    t.is(res.response, "graphical_styles");
});

test("SearchImagesCreative: withKeywordId will include keyword_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withKeywordId([1234, 5678]).execute();
    t.is(res.response, "keyword_ids");
});

test("SearchImagesCreative: withMinimumSize will include minimum_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withMinimumSize("small").execute();
    t.is(res.response, "minimum_size");
});

test("SearchImagesCreative: withNumberOfPeople will include number_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute();
    t.is(res.response, "number_of_people");
});

test("SearchImagesCreative: withOrientation will include orientations in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withOrientation(["horizontal", "square"]).execute();
    t.is(res.response, "orientations");
});

test("SearchImagesCreative: withPage will include page in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withPage(3).execute();
    t.is(res.response, "page");
});

test("SearchImagesCreative: withPageSize will include page_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withPageSize(50).execute();
    t.is(res.response, "page_size");
});

test("SearchImagesCreative: withPrestigeContentOnly will include prestige_content_only in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withPrestigeContentOnly(true).execute();
    t.is(res.response, "prestige_content_only");
});

test("SearchImagesCreative: withProductType will include product_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute();
    t.is(res.response, "product_types");
});

test("SearchImagesCreative: withSafeSearch will include safe_search in query", async t => {
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withSafeSearch(true).execute();
    t.is(res.response, "safe_search");
});

test("SearchImagesCreative: withSortOrder will include sort_order in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withSortOrder("newest").execute();
    t.is(res.response, "sort_order");
});

test ("SearchImagesCreative: withAcceptLanguage will include the Accept-Languaged header in request", async t => {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withAcceptLanguage("en-us").withPhrase("monkey").execute();
    var code = res[0];
    var body = res[1];
    t.is(code, 200);
    t.is(body.headers["accept-language"], "en-us");
    t.is(body.response, "accept-language");
});
