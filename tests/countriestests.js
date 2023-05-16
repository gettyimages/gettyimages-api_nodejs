const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.before(() => {
    nock("https://authentication.gettyimages.com")
        .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: "1800"
        });
    nock("https://api.gettyimages.com")
        .get("/v3/countries")
        .reply(200, {response : "response"});
});

test("Countries: When countries end point is called, the correct path is built", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.countries().execute();
    t.is(res.response, "response");
});

