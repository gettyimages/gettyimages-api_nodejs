var WebHelper = require("./webhelper.js");

module.exports = Collections;

function Collections(credentials, hostName) {
    this.execute = function (next) {
        var path = "/v3/collections";
        var webHelper = new WebHelper(credentials, hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    };
}