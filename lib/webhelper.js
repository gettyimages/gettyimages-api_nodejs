var https = require("https");
var os = require("os");
var pjson = require("../package.json");

module.exports = WebHelper;

function WebHelper(credentials, hostName) {

    this.get = async function (path) {

        var options = {
            hostname: hostName,
            method: "GET",
            path: path,
            port: 443,
            headers: {
                "Api-Key": credentials.apiKey,
                "Accept": "application/json"
            }
        };

        if (credentials.apiKey && credentials.apiSecret) {
            var response = await credentials.getAccessToken();
            console.log(response);
            if (response.access_token) {
                options.headers.Authorization = "Bearer " + response.access_token;
            }
            var request = await beginRequest(options);
            return request;
        } else {
            var request = await beginRequest(options);
            return request;
        }
    };

    this.postForm = async function (postData, path) {

        var options = {
            hostname: hostName,
            method: "POST",
            path: path,
            port: 443,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": postData.length
            }
        };

        var request = await beginRequest(options);
        request.write(postData);
        return request;
    };

    this.postQuery = function (path, data, next) {

        credentials.getAccessToken(function (err, response) {
            if (err) {
                next(err, null);
            } else {
                var options = {
                    hostname: hostName,
                    method: "POST",
                    path: path,
                    port: 443,
                    headers: {
                        "Api-Key": credentials.apiKey,
                        "Authorization": "Bearer " + response.access_token,
                        "Content-Length": 0
                    },
                    body: {body:JSON.stringify(data)}
                };

                var request = beginRequest(options, next);
                request.end();
            }
        });
    };

    this.putQuery = function (path, data, next) {

        credentials.getAccessToken(function (err, response) {
            if (err) {
                next(err, null);
            } else {
                var options = {
                    hostname: hostName,
                    method: "PUT",
                    path: path,
                    port: 443,
                    headers: {
                        "Api-Key": credentials.apiKey,
                        "Authorization": "Bearer " + response.access_token,
                        "Content-Length": 0
                    },
                    body: {body:JSON.stringify(data)}
                };

                var request = beginRequest(options, next);
                request.end();
            }
        });
    };

    this.deleteQuery = function (path, next) {

        credentials.getAccessToken(function (err, response) {
            if (err) {
                next(err, null);
            } else {
                var options = {
                    hostname: hostName,
                    method: "DELETE",
                    path: path,
                    port: 443,
                    headers: {
                        "Api-Key": credentials.apiKey,
                        "Authorization": "Bearer " + response.access_token,
                        "Content-Length": 0
                    },
                };

                var request = beginRequest(options, next);
                request.end();
            }
        });
    };

    function request(options) {

        addUserAgentString(options);

        return new Promise(https.request(options, function (response) {

            response.setEncoding("utf8");
            var str = "";

            response.on("data", function (chunk) {
                str += chunk;
            });
            response.on("end", function () {
                if (response.statusCode === 404) {
                    var err = new Error("Not Found");
                    err.statusCode = response.statusCode;
                    return err;

                } else {
                    return (str.length > 0) ? JSON.parse(str) : null;
                }
            });
            response.on("error", function (err) {
                return err;
            });
        }));
    }

    function addUserAgentString(options) {
        options.headers["User-Agent"] = "GettyImagesApiSdk/" + pjson.version + " (" + os.type() + " " + os.release() + "; " + "Node.js " + process.version + ")";
    }
}
