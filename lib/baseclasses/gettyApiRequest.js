"use strict";

const _credentials = new WeakMap();
const _hostName = new WeakMap();

class GettyApiRequest {
    constructor(credentials, hostName) {
        this.credentials = credentials;
        this.hostName = hostName;
    }

    get hostName() {
        return _hostName.get(this);
    }

    set hostName(value) {
        _hostName.set(this,value);
    }

    get credentials() {
        return _credentials.get(this);
    }

    set credentials(value) {
        _credentials.set(this,value);
    }   
}

module.exports = GettyApiRequest;