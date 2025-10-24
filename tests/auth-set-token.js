const api = require("../gettyimages-api");
const nock = require("nock");
const test = require("ava");
var authCount = 0;

test.beforeEach(() => {
    nock("https://authentication.gettyimages.com")
        .post("/oauth2/token", (body) => {
            authCount++;
            return (
                body.client_id === "apikey" &&
                body.client_secret === "apisecret" &&
                body.grant_type === "client_credentials"
            );
        })
        .times(0)
        .reply(200, {
            access_token: "client_credentials_access_token",
            token_type: "Bearer",
            expires_in: 1800,
        });
    nock("https://api.gettyimages.com")
        .get("/v3/search/images/creative")
        .query({ phrase: "cat" })
        .times(2)
        .reply(200, { response: "phrase" });
});

test("Authentication call should not be made because the token was provided by the caller.", async (t) => {
    var client = new api({
        apiKey: "apikey",
        apiSecret: "apisecret",
        token: {
            access_token: "provided_access_token",
            token_type: "Bearer",
            expiration: Date.now() + 1800000,
        },
    });
    await client.searchimagescreative().withPhrase("cat").execute();
    t.is(
        authCount,
        0,
        "Authentication call should not be made because the token was provided by the caller."
    );
});
