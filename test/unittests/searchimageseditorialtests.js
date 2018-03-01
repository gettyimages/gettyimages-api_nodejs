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
            .get("/v3/search/images/editorial")
            .query({ "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "age_of_people": ["adult", "newborn", "0-1_months", "12-17_months", "mature_adult"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "artists": ["roman makhmutov", "Linda Raymond"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "collection_codes": ["WRI", "ARF"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "collections_filter_type": "exclude", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "color": "#002244", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "compositions": ["abstract", "headshot"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "editorial_segments": ["archival", "publicity"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "embed_content_only": "true", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "end_date": "2015-04-01", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "entity_uris": [123, 456].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "ethnicity": ["black", "japanese"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "event_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "exclude_nudity": "true", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "fields": ["asset_family", "id"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "file_types": ["eps", "jpg"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "graphical_styles": ["fine_art", "illustration"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "keyword_ids": [1234, 5678].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "minimum_quality_rank": 2, "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "minimum_size": "small", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "number_of_people": ["one", "group"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "orientations": ["horizontal", "square"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "page": 3, "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "page_size": 50, "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "product_types": ["easyaccess", "editorialsubscription"].join(","), "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "sort_order": "newest", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "specific_people": "reggie jackson", "phrase": "cat" })
            .reply(200, {})
            .get("/v3/search/images/editorial")
            .query({ "start_date": "2015-04-01", "phrase": "cat" })
            .reply(200, {});
});

test.cb("SearchImagesEditorial: withPhrase will include phrase in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withAgeOfPeople will include age_of_people in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withAgeOfPeople(["adult", "newborn", "0-1_months"]).withAgeOfPeople(["12-17_months", "mature_adult"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withArtist will include artists in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withArtist(["roman makhmutov", "Linda Raymond"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withCollectionCode will include codes in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withCollectionCode(["WRI", "ARF"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withCollectionsFilterType will include collections_filter_type in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withCollectionsFilterType("exclude").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withColor will include color in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withColor("#002244").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withCompostition will include compostition in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withComposition(["abstract", "headshot"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEditorialSegments will include editorial_segments in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEditorialSegments(["archival", "publicity"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEmbedContentOnly will include embed_content_only in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEmbedContentOnly().execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEndDate will include end_date in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEndDate("2015-04-01").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEntityUris will include entity_uris in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEntityUris([123, 456]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEthnicity will include ethnicity in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEthnicity(["black", "japanese"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withEventId will include event_ids in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withEventId([1234, 5678]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withExcludeNudity will include exclude_nudity in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withExcludeNudity().execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withResponseField will include fields in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withResponseField(["asset_family", "id"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withFileType will include file_types in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withFileType(["eps", "jpg"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withGraphicalStyle will include graphical_styles in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withGraphicalStyle(["fine_art", "illustration"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withKeywordId will include keyword_ids in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withKeywordId([1234, 5678]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withMinimumQualityRank will include minimum_quality_rank in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withMinimumQualityRank(2).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withMinimumSize will include minimum_size in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withMinimumSize("small").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withNumberOfPeople will include number_of_people in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withNumberOfPeople(["one", "group"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withOrientation will include orientations in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withOrientation(["horizontal", "square"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withPage will include page in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withPage(3).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withPageSize will include page_size in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withPageSize(50).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withProductType will include product_types in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withProductType(["easyaccess", "editorialsubscription"]).execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withSortOrder will include sort_order in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withSortOrder("newest").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withSpecificPeople will include specific_people in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withSpecificPeople("reggie jackson").execute((err, response) => {
    }));
});

test.cb("SearchImagesEditorial: withStartDate will include start_date in query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.searchimageseditorial().withPhrase("cat").withStartDate("2015-04-01").execute((err, response) => {
    }));
});