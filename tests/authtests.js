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
                .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=password&username=username&password=password")
                .reply(200, {
                access_token: "resource_owner_access_token",
                token_type: "Bearer",
                expires_in: "1800",
                refresh_token: "refreshtoken"
                })
                .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&refresh_token=refreshtoken&grant_type=refresh_token")
                .reply(200, {
                    access_token: "accesstoken",
                    token_type: "Bearer",
                    expires_in: "1800"
                });
});

test("Client Credentials should return an access token when an api key and secret are provided", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.getAccessToken()).then(res => {
        t.is(res.access_token, "client_credentials_access_token");
    });
});

test("Resource Owner Grant should return an access token when an api key, secret, username, and password are provided", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret", username: "username", password: "password" }, null);
    return Promise.resolve(client.getAccessToken()).then(res => {
        t.is(res.access_token, "resource_owner_access_token");
    });
});

test("Refresh Token should return an access token when an api key, secret, and refresh token are provided", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret", refresh_token:"refreshtoken" }, null);
    return Promise.resolve(client.getAccessToken()).then(res => {
        t.is(res.access_token, "accesstoken");
    });
});

