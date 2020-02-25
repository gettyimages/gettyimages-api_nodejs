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
            .post("/v3/downloads/videos/123")
            .query({ "auto_download": "false" })
            .reply(200, {response : "response"})
            .post("/v3/downloads/videos/123")
            .query({ "product_id": 5678, "auto_download": "false" })
            .reply(200, {response : "response"})
            .post("/v3/downloads/videos/123")
            .query({ "size": "hd1", "auto_download": "false"})
            .reply(200, {response : "response"});
});

test("DownloadsVideos: When given an id, the id will be part of the path", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.downloadsvideos().withId("123").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("DownloadsVideos: When given a product id, the product_id will be part of the query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.downloadsvideos().withId("123").withProductId(5678).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("DownloadsVideos: When given a size, the size will be part of the query", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.downloadsvideos().withId("123").withSize("hd1").execute()).then(res => {
        t.is(res.response, "response");
    });
});