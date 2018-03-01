import Api from "../../gettyimages-api";
import nock from "nock";
import test from "ava";

test.beforeEach(t=>{
    nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/search/images/creative")
            .query({ "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "color": "#002244", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "embed_content_only": "true", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "license_models": ["rightsmanaged", "royaltyfree"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "minimum_size": "small", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "prestige_content_only": "true", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/creative")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {});
});

test.cb("SearchImagesCreative: withPhrase will include phrase in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withArtist will include artists in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withCollectionCode will include codes in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withCollectionsFilterType("exclude").execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withColor will include color in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withColor("#002244").execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withCompostition will include compostition in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withComposition(["abstract", "headshot"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withEmbedContentOnly will include embed_content_only in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withEmbedContentOnly().execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withEthnicity will include ethnicity in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withEthnicity(["black", "japanese"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withExcludeNudity().execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withResponseField will include fields in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withResponseField(["asset_family", "id"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withFileType will include file_types in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withFileType(["eps", "jpg"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withGraphicalStyle will include graphical_styles in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withKeywordId will include keyword_ids in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withKeywordId([1234, 5678]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withLicenseModel will include license_models in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withLicenseModel(["rightsmanaged", "royaltyfree"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withMinimumSize will include minimum_size in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withMinimumSize("small").execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withNumberOfPeople will include number_of_people in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withOrientation will include orientations in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withOrientation(["horizontal", "square"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withPage will include page in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withPage(3).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withPageSize will include page_size in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withPageSize(50).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withPrestigeContentOnly will include prestige_content_only in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withPrestigeContentOnly().execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withProductType will include product_types in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesCreative: withSortOrder will include sort_order in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimagescreative().withPhrase("cat").withSortOrder("newest").execute((err, response) => {
    }));
});

