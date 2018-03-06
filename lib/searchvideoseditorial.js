"use strict";
var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchVideosEditorial extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.editorialVideoTypes = [];
        this.entityUris = [];
        this.excludeNudity = false;
        this.fields = [];
        this.formatAvailable = null;
        this.frameRates = [];
        this.keywordIds = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.productTypes = [];
        this.sortOrder = null;
        this.specificPeople = [];

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
        if (this.editorialVideoTypes.length > 0) {
            params.editorial_video_types = this.editorialVideoTypes.join(",");
        }
        if (this.entityUris.length > 0) {
            params.entity_uris = this.entityUris.join(",");
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
        if (this.specificPeople.length > 0) {
            params.specific_people = this.specificPeople.join(",");
        }
      
        var path = "/v3/search/videos/editorial";
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        return webHelper.get(path);
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

    withEditorialVideoType(editorialVideoType) {
        this.editorialVideoTypes[this.editorialVideoTypes.length] = editorialVideoType;
        return this;
    }

    withEntityUris(entityUris) {
        this.entityUris[this.entityUris.length] = entityUris;
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

    withSpecificPeople(specificPeople) {
        this.specificPeople[this.specificPeople.length] = specificPeople;
        return this;
    }
    

}

module.exports = SearchVideosEditorial;