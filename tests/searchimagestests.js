const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.beforeEach(() => {
    nock("https://api.gettyimages.com")
        .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: "1800"
        })
        .get("/v3/search/images")
        .query({ "phrase": "cat" })
        .reply(200, {response : "phrase"})
        .get("/v3/search/images")
        .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
        .reply(200, {response : "age_of_people"})
        .get("/v3/search/images")
        .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
        .reply(200, {response : "artists"})
        .get("/v3/search/images")
        .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
        .reply(200, {response : "collection_codes"})
        .get("/v3/search/images")
        .query({ "collections_filter_type": "exclude", "phrase": "cat" })
        .reply(200, {response : "collections_filter_type"})
        .get("/v3/search/images")
        .query({ "color": "#002244", "phrase": "cat" })
        .reply(200, {response : "color"})
        .get("/v3/search/images")
        .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
        .reply(200, {response : "compositions"})
        .get("/v3/search/images")
        .query({ "embed_content_only": "true", "phrase": "cat" })
        .reply(200, {response : "embed_content_only"})
        .get("/v3/search/images")
        .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
        .reply(200, {response : "ethnicity"})
        .get("/v3/search/images")
        .query({ "event_ids": [1234, 5678].join(","), "phrase": "cat" })
        .reply(200, {response : "event_ids"})
        .get("/v3/search/images")
        .query({ "exclude_nudity": "true", "phrase": "cat" })
        .reply(200, {response : "exclude_nudity"})
        .get("/v3/search/images")
        .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
        .reply(200, {response : "fields"})
        .get("/v3/search/images")
        .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
        .reply(200, {response : "file_types"})
        .get("/v3/search/images")
        .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
        .reply(200, {response : "graphical_styles"})
        .get("/v3/search/images")
        .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
        .reply(200, {response : "keyword_ids"})
        .get("/v3/search/images")
        .query({ "minimum_size": "small", "phrase": "cat" })
        .reply(200, {response : "minimum_size"})
        .get("/v3/search/images")
        .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
        .reply(200, {response : "number_of_people"})
        .get("/v3/search/images")
        .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
        .reply(200, {response : "orientations"})
        .get("/v3/search/images")
        .query({ "page": 3, "phrase": "cat" })
        .reply(200, {response : "page"})
        .get("/v3/search/images")
        .query({ "page_size": 50, "phrase": "cat" })
        .reply(200, {response : "page_size"})
        .get("/v3/search/images")
        .query({ "prestige_content_only": "true", "phrase": "cat" })
        .reply(200, {response : "prestige_content_only"})
        .get("/v3/search/images")
        .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
        .reply(200, {response : "product_types"})
        .get("/v3/search/images")
        .query({ "sort_order": "newest", "phrase": "cat" })
        .reply(200, {response : "sort_order"})
        .get("/v3/search/images")
        .query({ "specific_people": "reggie jackson", "phrase": "cat" })
        .reply(200, {response : "specific_people"})
        .get("/v3/search/images")
        .query({"phrase":"monkey"})
        .reply(200,function(path, reqBody, cb) {
            cb(null,[200, {response: "accept-language", headers: this.req.headers}]);
        });
});

test("SearchImages: withPhrase will include phrase in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").execute();
    t.is(res.response, "phrase");
});

test("SearchImages: withAgeOfPeople will include age_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute();
    t.is(res.response, "age_of_people");
});

test("SearchImages: withArtist will include artists in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute();
    t.is(res.response, "artists");
});

test("SearchImages: withCollectionCode will include collection_codes in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute();
    t.is(res.response, "collection_codes");
});

test("SearchImages: withCollectionsFilterType will include collections_filter_type in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withCollectionsFilterType("exclude").execute();
    t.is(res.response, "collections_filter_type");
});

test("SearchImages: withColor will include color in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withColor("#002244").execute();
    t.is(res.response, "color");
});

test("SearchImages: withCompostition will include compositions in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withComposition(["abstract", "headshot"]).execute();
    t.is(res.response, "compositions");
});

test("SearchImages: withEmbedContentOnly will include embed_content_only in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withEmbedContentOnly(true).execute();
    t.is(res.response, "embed_content_only");
});

test("SearchImages: withEthnicity will include ethnicity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withEthnicity(["black", "japanese"]).execute();
    t.is(res.response, "ethnicity");
});

test("SearchImages: withEventId will include event_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withEventId([1234, 5678]).execute();
    t.is(res.response, "event_ids");
});

test("SearchImages: withExcludeNudity will include exclude_nudity in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withExcludeNudity(true).execute();
    t.is(res.response, "exclude_nudity");
});

test("SearchImages: withResponseField will include fields in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withResponseField(["asset_family", "id"]).execute();
    t.is(res.response, "fields");
});

test("SearchImages: withFileType will include file_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withFileType(["eps", "jpg"]).execute();
    t.is(res.response, "file_types");
});

test("SearchImages: withGraphicalStyle will include graphical_styles in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute();
    t.is(res.response, "graphical_styles");
});

test("SearchImages: withKeywordId will include keyword_ids in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withKeywordId([1234, 5678]).execute();
    t.is(res.response, "keyword_ids");
});

test("SearchImages: withMinimumSize will include minimum_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withMinimumSize("small").execute();
    t.is(res.response, "minimum_size");
});

test("SearchImages: withNumberOfPeople will include number_of_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute();
    t.is(res.response, "number_of_people");
});

test("SearchImages: withOrientation will include orientations in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withOrientation(["horizontal", "square"]).execute();
    t.is(res.response, "orientations");
});

test("SearchImages: withPage will include page in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withPage(3).execute();
    t.is(res.response, "page");
});

test("SearchImages: withPageSize will include page_size in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withPageSize(50).execute();
    t.is(res.response, "page_size");
});

test("SearchImages: withPrestigeContentOnly will include prestige_content_only in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withPrestigeContentOnly(true).execute();
    t.is(res.response, "prestige_content_only");
});

test("SearchImages: withProductType will include product_types in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute();
    t.is(res.response, "product_types");
});

test("SearchImages: withSortOrder will include sort_order in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withSortOrder("newest").execute();
    t.is(res.response, "sort_order");
});

test("SearchImages: withSpecificPeople will include specific_people in query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withPhrase("cat").withSpecificPeople("reggie jackson").execute();
    t.is(res.response, "specific_people");
});

test ("SearchImages: withAcceptLanguage will include the Accept-Languaged header in request", async t => {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimages().withAcceptLanguage("en-us").withPhrase("monkey").execute();
    var code = res[0];
    var body = res[1];
    t.is(code, 200);
    t.is(body.headers["accept-language"], "en-us");
    t.is(body.response, "accept-language");
});
