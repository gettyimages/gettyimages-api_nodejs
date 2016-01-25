var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");

module.exports = function SearchVideos(credentials, hostName) {
    var _assetFamily = null;
    var _excludeNudity = false;
    var _fields = [];
    var _licenseModels = [];
    var _page = 0;
    var _pageSize = 0;
    var _phrase = null;
    var _sortOrder = null;
    var _ageOfPeople = [];
    var _collectionCodes = [];
    var _collectionsFilterType = null;
    var _keywordIds = [];
    var _productTypes = [];
    var _specificPeople = [];
    var _formatAvailable = null;
    
    this.creative = function () {
        _assetFamily = "creative";
        return this;
    };
    this.editorial = function () {
        _assetFamily = "editorial";
        return this;
    };
    this.execute = function (next) {
        var params = {};
        if (_excludeNudity) {
            params.exclude_nudity = _excludeNudity;
        }
        if (_fields.length > 0) {
            params.fields = _fields.join(",");
        }
        if (_licenseModels.length > 0) {
            params.license_models = _licenseModels.join(",");
        }
        if (_page > 0) {
            params.page = _page;
        }
        if (_pageSize > 0) {
            params.page_size = _pageSize;
        }
        if (_phrase) {
            params.phrase = _phrase;
        }
        if (_sortOrder) {
            params.sort_order = _sortOrder;
        }
        if (_ageOfPeople.length > 0) {
            params.age_of_people = _ageOfPeople.join(",");
        }
        if (_collectionCodes.length > 0) {
            params.collection_codes = _collectionCodes.join(",");
        }
        if (_collectionsFilterType) {
            params.collections_filter_type = _collectionsFilterType;
        }
        if (_keywordIds.length > 0) {
            params.keyword_ids = _keywordIds.join(",");
        }
        if (_specificPeople.length > 0) {
            params.specific_people = _specificPeople.join(",");
        }
        if (_productTypes.length > 0) {
            params.product_types = _productTypes.join(",");
        }
        if (_formatAvailable) {
            params.format_available = _formatAvailable;
        }
        
        var path = "/v3/search/videos";
        if (_assetFamily) {
            path += "/";
            path += _assetFamily;
        }
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(credentials, hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    };
    this.withLicenseModel = function (licenseModel) {
        if (_assetFamily === "editorial") {
            throw new SdkException(" must not be an editorial search to add a license model");
        }
        _licenseModels[_licenseModels.length] = licenseModel;
        return this;
    };
    this.withExcludeNudity = function (excludeNudity) {
        _excludeNudity = excludeNudity;
        return this;
    };
    this.withPage = function (page) {
        _page = page;
        return this;
    };
    this.withPageSize = function (pageSize) {
        _pageSize = pageSize;
        return this;
    };
    this.withPhrase = function (phrase) {
        _phrase = phrase;
        return this;
    };
    this.withResponseField = function (field) {
        _fields[_fields.length] = field;
        return this;
    };
    this.withSortOrder = function (sortOrder) {
        _sortOrder = sortOrder;
        return this;
    };
    this.withAgeOfPeople = function (ageOfPeople) {
        _ageOfPeople[_ageOfPeople.length] = ageOfPeople;
        return this;
    };
    this.withCollectionCode = function (collectionCode) {
        _collectionCodes[_collectionCodes.length] = collectionCode;
        return this;
    };
    this.withCollectionsFilterType = function (collectionsFilterType) {
        _collectionsFilterType = collectionsFilterType;
        return this;
    };
    this.withKeywordId = function (keywordId) {
        _keywordIds[_keywordIds.length] = keywordId;
        return this;
    };
    this.withProductType = function (productType) {
        _productTypes[_productTypes.length] = productType;
        return this;
    };
    this.withSpecificPerson = function (specificPerson) {
        if (_assetFamily === "creative") {
            throw new SdkException("search images must be editorial or blended to add a specific person");
        }
        _specificPeople[_specificPeople.length] = specificPerson;
        return this;
    };
    
    this.withFormatAvailable = function (formatAvailable) {
        _formatAvailable = formatAvailable;
        return this;
    };
};