"use strict";

class SdkException {
    constructor(message) {
        this.message = message;
    }
    toString() {
        return "SdkException: " + this.message;
    }
}

module.exports = SdkException;