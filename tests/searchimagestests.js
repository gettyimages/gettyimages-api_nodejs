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
            .get("/v3/search/images")
            .query({ "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "color": "#002244", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "embed_content_only": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "event_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "minimum_size": "small", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "prestige_content_only": "true", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({ "specific_people": "reggie jackson", "phrase": "cat" })
            .reply(200, {response : "response"})
            .get("/v3/search/images")
            .query({"phrase":"monkey"})
            .reply(200,function(path, reqBody, cb) {
                cb(null,[200, {response: "response", headers: this.req.headers}]);
             });
});

test("SearchImages: withPhrase will include phrase in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withArtist will include artists in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withCollectionCode will include codes in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withCollectionsFilterType("exclude").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withColor will include color in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withColor("#002244").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withCompostition will include compostition in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withComposition(["abstract", "headshot"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withEmbedContentOnly will include embed_content_only in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withEmbedContentOnly().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withEthnicity will include ethnicity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withEthnicity(["black", "japanese"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withEventId will include event_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withEventId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withExcludeNudity().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withResponseField will include fields in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withResponseField(["asset_family", "id"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withFileType will include file_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withFileType(["eps", "jpg"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withGraphicalStyle will include graphical_styles in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withKeywordId will include keyword_ids in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withKeywordId([1234, 5678]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withMinimumSize will include minimum_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withMinimumSize("small").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withNumberOfPeople will include number_of_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withOrientation will include orientations in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withOrientation(["horizontal", "square"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withPage will include page in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withPage(3).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withPageSize will include page_size in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withPageSize(50).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withPrestigeContentOnly will include prestige_content_only in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withPrestigeContentOnly().execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withProductType will include product_types in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withSortOrder will include sort_order in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withSortOrder("newest").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("SearchImages: withSpecificPeople will include specific_people in query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withPhrase("cat").withSpecificPeople("reggie jackson").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test ("SearchImages: withAcceptLanguage will include the Accept-Languaged header in request", t=> {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.searchimages().withAcceptLanguage("en-us").withPhrase("monkey").execute().then(res => {
        var code = res[0];
        var body = res[1];
        t.is(code, 200);
        t.is(body.headers["accept-language"],"en-us");
        t.is(body.response,"response");
    }));
});
