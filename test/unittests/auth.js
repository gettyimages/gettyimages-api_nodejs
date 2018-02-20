import api from "../../gettyimages-api";
import nock from "nock";
import test from "ava";

test.before(t=>{
    nock("https://api.gettyimages.com")
                .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
                .reply(200, {
                    access_token: "client_credentials_access_token",
                    token_type: "Bearer",
                    expires_in: "1800"
                });
});
test.cb("Client Credentials should return an access token when an api key and secret are provided", t => {  
    var client = new api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
    t.end(client.getAccessToken((err, response) => {
        t.is(response.access_token, "client_credentials_access_token");
    }));
});
