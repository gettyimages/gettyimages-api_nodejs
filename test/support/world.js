//Provides global context support for cucumber

function World() {
    this.apikey = "";
    this.apisecret = "";
    this.username = "";
    this.password = "";
    this.accessToken = "";
    this.tokenType = "";
    this.refreshToken = "";
    this.expiresIn = -1;
}

module.exports = function() {
    this.World = World;
};