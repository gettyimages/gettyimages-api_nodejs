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
            .get("/v3/search/images")
            .query({ "phrase": "cat", "file_types": "eps"})
            .reply(200, {response : "response"})
            .post("/v3/downloads/images/123")
            .query({ "file_type": "jpg", "auto_download": "false" })
            .reply(200, {response : "response"})
            .delete("/v3/boards/123?")
            .reply(204, {response : "response"})
            .put("/v3/boards/123?")
            .reply(204, {response : "response"});
});

test("CustomRequest: A get method will create the appropriate request", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.customrequest().withRoute("search/images").withMethod("get").withQueryParameters({"phrase": "cat", "file_types": "eps"}).execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("CustomRequest: A post method will create the appropriate request", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.customrequest().withRoute("downloads/images/123").withMethod("post").withQueryParameters({"file_type": "jpg", "auto_download": "false"}).execute()).then(res => {
        t.is(res.response, "response");
    });

});

test("CustomRequest: A delete method will create the appropriate request", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.customrequest().withRoute("boards/123").withMethod("delete").execute()).then(res => {
        t.is(res.response, "response");
    });
});

test("CustomRequest: A put method will create the appropriate request", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    return Promise.resolve(client.customrequest().withRoute("boards/123").withMethod("put").withBody({"name": "this board", "description": "some description"}).execute()).then(res => {
        t.is(res.response, "response");
    });
});
