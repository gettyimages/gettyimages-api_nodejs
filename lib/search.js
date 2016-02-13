"use strict";

var SearchImages = require("./searchimages.js");
var SearchVideos = require("./searchvideos.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class Search extends GettyApiRequest {
    images() {
        return new SearchImages(this.credentials,this.hostName);
    }
    
    videos() {
        return new SearchVideos(this.credentials,this.hostName);
    }
}

module.exports = Search;
