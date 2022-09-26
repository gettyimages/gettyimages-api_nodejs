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
        .get("/v3/search/images/creative")
        .query({ "phrase": "cat", "safe_search": "true"})
        .reply(200, { response: "custom_parameter_response" })
        .get("/v3/search/images/creative")
        .query({ "phrase": "cat" })
        .matchHeader("gi-country-code", "CAN")
        .reply(200, {response : "custom_header_response"})
});

test("CustomParameter: The custom parameter will be added to the request", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withCustomParameter("safe_search", "true").execute();
    t.is(res.response, "custom_parameter_response");
});

test("Customheader: The custom header will be added to the request", async t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    const res = await client.searchimagescreative().withPhrase("cat").withCustomHeader("gi-country-code", "CAN").execute();
    t.is(res.response, "custom_header_response");
});

