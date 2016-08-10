var https = require("https");
var os = require("os");
var pjson = require("../package.json");

module.exports = WebHelper;

function WebHelper(credentials, hostName) {

    this.get = function (path, next) {

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
            credentials.getAccessToken(function (err, response) {
                if (err) {
                    next(err, null);
                } else {
                    if (response.access_token) {
                        options.headers.Authorization = "Bearer " + response.access_token;
                    }
                    var request = beginRequest(options, next);
                    request.end();
                }
            });
        } else {
            var request = beginRequest(options, next);
            request.end();
        }
    };

    this.postForm = function (postData, path, next) {

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

        var request = beginRequest(options, next);
        request.write(postData);
        request.end();
    };

    this.postQuery = function (path, next) {

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
                    }
                };

                var request = beginRequest(options, next);
                request.end();
            }
        });
    };

    function beginRequest(options, next) {

        addUserAgentString(options);

        return https.request(options, function (response) {

            response.setEncoding("utf8");
            var str = "";

            response.on("data", function (chunk) {
                str += chunk;
            });
            response.on("end", function () {
                if (response.statusCode === 404) {
                    var err = new Error("Not Found");
                    err.statusCode = response.statusCode;
                    next(err, null);

                } else {
                    next(null, (str.length > 0) ? JSON.parse(str) : null);
                }
            });
            response.on("error", function (err) {
                next(err, null);
            });
        });
    }

    function addUserAgentString(options) {
        options.headers["User-Agent"] = "GettyImagesApiSdk/" + pjson.version + " (" + os.type() + " " + os.release() + "; " + "Node.js " + process.version + ")";
    }
}
