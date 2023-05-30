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
        .get("/v3/images/123")
        .reply(200, {response : "response"})
        .get("/v3/images")
        .query({ "ids": ["456", "789"].join(",") })
        .reply(200, {response : "response"})
        .get("/v3/images/101112")
        .query({ "fields": ["id", "artist"].join(",")})
        .reply(200, {response : "response"});
});

test("Images: When given a single id, the id will be part of the path", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.images().withIds("123").execute();
    t.is(res.response, "response");
});

test("Images: When given an array of ids, the ids will be part of the query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.images().withIds(["456", "789"]).execute();
    t.is(res.response, "response");
});

test("Images: When given an array of fields, the fields will be part of the query", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.images().withId("101112").withResponseField(["id", "artist"]).execute();
    t.is(res.response, "response");
});