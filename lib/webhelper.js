var https = require("https");
var os = require("os");
var pjson = require("../package.json");

module.exports = WebHelper;

function WebHelper(credentials, hostName) {

    this.get = function (path) {

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
            var response = credentials.getAccessToken();
            if (response.access_token) {
                options.headers.Authorization = "Bearer " + response.access_token;
            }
        }

        return request(options);
    };

    this.postForm =  function (path, postData) {

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

        return request(options, postData);

    };

    this.postQuery = function (path, postData) {

        var options = {
            hostname: hostName,
            method: "POST",
            path: path,
            port: 443,
            headers: {
                "Api-Key": credentials.apiKey,
                "Content-Length": 0
            },
            body: {body:JSON.stringify(postData)}
        };

        if (credentials.apiKey && credentials.apiSecret) {
            var response = credentials.getAccessToken();
            if (response.access_token) {
                options.headers.Authorization = "Bearer " + response.access_token;
            }
        }
        
        return request(options);
    };

    this.putQuery = function (path, postData) {

        var options = {
            hostname: hostName,
            method: "PUT",
            path: path,
            port: 443,
            headers: {
                "Api-Key": credentials.apiKey,
                "Content-Length": 0
            },
            body: {body:JSON.stringify(postData)}
        };

        if (credentials.apiKey && credentials.apiSecret) {
            var response = credentials.getAccessToken();
            if (response.access_token) {
                options.headers.Authorization = "Bearer " + response.access_token;
            }
        }
        
        return request(options);
    };

    this.deleteQuery = function (path) {

        var options = {
            hostname: hostName,
            method: "DELETE",
            path: path,
            port: 443,
            headers: {
                "Api-Key": credentials.apiKey,
                "Content-Length": 0
            },
        };

        if (credentials.apiKey && credentials.apiSecret) {
            var response = credentials.getAccessToken();
            if (response.access_token) {
                options.headers.Authorization = "Bearer " + response.access_token;
            }
        }
        
        return request(options);
    };

    function request(options, postData = null) {

        addUserAgentString(options);

        return new Promise((resolve, reject) => {
            var request = https.request(options, function (response) {

                response.setEncoding("utf8");
                var str = "";

                response.on("data", function (chunk) {
                    str += chunk;
                });
                response.on("end", function () {
                    if (response.statusCode === 404) {
                        var err = new Error("Not Found");
                        err.statusCode = response.statusCode;
                        reject(err);

                    } else {
                        resolve((str.length > 0) ? JSON.parse(str) : null);
                    }
                });
                response.on("error", function (err) {
                    reject(err);
                });
            });
            if (postData) {
                request.write(postData)
            }
            request.end();
        })
    };

    function addUserAgentString(options) {
        options.headers["User-Agent"] = "GettyImagesApiSdk/" + pjson.version + " (" + os.type() + " " + os.release() + "; " + "Node.js " + process.version + ")";
    }
}
