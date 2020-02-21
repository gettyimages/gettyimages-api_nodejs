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
            .get("/v3/search/images/editorial")
            .query({ "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "color": "#002244", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "editorial_segments": ["archival", "publicity"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "embed_content_only": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "end_date": "2015-04-01", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "entity_uris": [123, 456].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "event_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "minimum_quality_rank": 2, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "minimum_size": "small", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "specific_people": "reggie jackson", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({ "start_date": "2015-04-01", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images/editorial")
            .query({"phrase":"monkey"})
            .reply(200,function(path, reqBody, cb) {
                cb(null,[200, {response: "response", headers: this.req.headers}]);
             });
});

test("SearchImagesEditorial: withPhrase will include phrase in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withArtist will include artists in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withCollectionCode will include codes in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withCollectionsFilterType("exclude").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withColor will include color in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withColor("#002244").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withCompostition will include compostition in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withComposition(["abstract", "headshot"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEditorialSegments will include editorial_segments in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEditorialSegments(["archival", "publicity"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEmbedContentOnly will include embed_content_only in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEmbedContentOnly().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEndDate will include end_date in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEndDate("2015-04-01").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEntityUris will include entity_uris in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEntityUris([123, 456]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEthnicity will include ethnicity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEthnicity(["black", "japanese"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withEventId will include event_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withEventId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withExcludeNudity().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withResponseField will include fields in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withResponseField(["asset_family", "id"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withFileType will include file_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withFileType(["eps", "jpg"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withGraphicalStyle will include graphical_styles in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withKeywordId will include keyword_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withKeywordId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withMinimumQualityRank will include minimum_quality_rank in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withMinimumQualityRank(2).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withMinimumSize will include minimum_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withMinimumSize("small").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withNumberOfPeople will include number_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withOrientation will include orientations in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withOrientation(["horizontal", "square"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withPage will include page in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withPage(3).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withPageSize will include page_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withPageSize(50).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withProductType will include product_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withSortOrder will include sort_order in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withSortOrder("newest").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withSpecificPeople will include specific_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withSpecificPeople("reggie jackson").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImagesEditorial: withStartDate will include start_date in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withPhrase("cat").withStartDate("2015-04-01").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test ("SearchImagesEditorial: withAcceptLanguage will include the Accept-Languaged header in request", t=> {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimageseditorial().withAcceptLanguage("en-us").withPhrase("monkey").execute().then(res => {
        var code = res[0];
        var body = res[1];
        t.is(code, 200);
        t.is(body.headers["accept-language"],"en-us");
        t.is(body.response,"response");
    }));
});