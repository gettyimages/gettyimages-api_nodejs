const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");

test.before(t=>{
    nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/collections")
            .reply(200, {response : "response"});
});

test("Collections: When collections end point is called, the correct path is built", t => {
    var client = new api({apiKey: "apikey", apiSecret: "apisecret"}, null);
    return Promise.resolve(client.collections().execute()).then(res => {
        t.is(res.response, "response");
    });
})