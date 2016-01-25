var SearchImages = require("./searchimages.js");
var SearchVideos = require("./searchvideos.js");

module.exports = Search;

function Search(credentials, hostName) {
    this.images = function () {
        return new SearchImages(credentials, hostName);
    };
    
    this.videos = function() {
        return new SearchVideos(credentials,hostName);
    };
}