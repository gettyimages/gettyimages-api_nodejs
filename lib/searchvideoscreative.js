"use strict";
var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchVideosCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.excludeNudity = false;
        this.fields = [];
        this.formatAvailable = null;
        this.frameRates = [];
        this.keywordIds = [];
        this.licenseModels = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.productTypes = [];
        this.sortOrder = null;

    }
    
    execute(next) {
        var params = {};
        if (this.ageOfPeople.length > 0) {
            params.age_of_people = this.ageOfPeople.join(",");
        }
        if (this.collectionCodes.length > 0) {
            params.collection_codes = this.collectionCodes.join(",");
        }
        if (this.collectionsFilterType) {
            params.collections_filter_type = this.collectionsFilterType;
        }
        if (this.excludeNudity) {
            params.exclude_nudity = this.excludeNudity;
        }
        if (this.fields.length > 0) {
            params.fields = this.fields.join(",");
        }
        if (this.formatAvailable) {
            params.format_available = this.formatAvailable;
        }
        if (this.frameRates.length > 0) {
            params.frame_rates = this.frameRates.join(",");
        }
        if (this.keywordIds.length > 0) {
            params.keyword_ids = this.keywordIds.join(",");
        }
        if (this.licenseModels.length > 0) {
            params.license_models = this.licenseModels.join(",");
        }
        if (this.page > 0) {
            params.page = this.page;
        }
        if (this.pageSize > 0) {
            params.page_size = this.pageSize;
        }
        if (this.phrase) {
            params.phrase = this.phrase;
        }
        if (this.productTypes.length > 0) {
            params.product_types = this.productTypes.join(",");
        }
        if (this.sortOrder) {
            params.sort_order = this.sortOrder;
        }
      
        var path = "/v3/search/videos/creative";
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    }

    withAgeOfPeople(ageOfPeople) {
        this.ageOfPeople[this.ageOfPeople.length] = ageOfPeople;
        return this;
    }
    
    withCollectionCode(collectionCode) {
        this.collectionCodes[this.collectionCodes.length] = collectionCode;
        return this;
    }
    
    withCollectionsFilterType(collectionsFilterType) {
        this.collectionsFilterType = collectionsFilterType;
        return this;
    }

    withExcludeNudity(excludeNudity) {
        this.excludeNudity = excludeNudity;
        return this;
    }

    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }

    withFormatAvailable(formatAvailable) {
        this.formatAvailable = formatAvailable;
        return this;
    }

    withFrameRate(frameRate) {
        this.frameRates = frameRate;
        return this;
    }

    withKeywordId(keywordId) {
        this.keywordIds[this.keywordIds.length] = keywordId;
        return this;
    }
    
    withLicenseModel(licenseModel) {
        this.licenseModels[this.licenseModels.length] = licenseModel;
        return this;
    }
    
    withPage(page) {
        this.page = page;
        return this;
    }
    
    withPageSize(pageSize) {
        this.pageSize = pageSize;
        return this;
    }
    
    withPhrase(phrase) {
        this.phrase = phrase;
        return this;
    }
    
    withProductType(productType) {
        this.productTypes[this.productTypes.length] = productType;
        return this;
    }
    
    withSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }
    

}

module.exports = SearchVideosCreative;