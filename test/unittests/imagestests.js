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
            .get("/v3/images/123")
            .reply(200)
            .get("/v3/images")
            .query({ "ids": ["456", "789"].join(",") })
            .reply(200)
            .get("/v3/images/101112")
            .query({ "fields": ["id", "artist"].join(",")})
            .reply(200);
});

test.cb("Images: When given a single id, the id will be part of the path", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.images().withIds("123").execute((err, response) => {
    }));
});

test.cb("Images: When given a list of ids, the ids will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.images().withIds(["456", "789"]).execute((err, response) => {
    }));
});

test.cb("Images: When given a list of fields, the fields will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.images().withId("101112").withResponseField(["id", "artist"]).execute((err, response) => {
    }));
});