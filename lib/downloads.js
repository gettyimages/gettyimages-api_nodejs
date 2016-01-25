var SdkException = require("./sdkexception");
var DownloadsVideos = require("./downloads-videos");
var DownloadsImages = require("./downloads-images");

module.exports = function Downloads(credentials, hostName) {

    if (!credentials.getUsername()) {
        throw new SdkException("must specify a username");
    }

    if (!credentials.getPassword()) {
        throw new SdkException("must specify a password");
    }

    this.videos = function  () {
        return new DownloadsVideos(credentials, hostName);  
    };
    
    this.images = function(){
        return new DownloadsImages(credentials, hostName);
    };
};