"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchImagesCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.ageOfPeople = [];
        this.artists = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.color = null;
        this.compositions = [];
        this.embedContentOnly = false;
        this.ethnicities = [];
        this.excludeNudity = false;
        this.fields = [];
        this.fileTypes = [];
        this.graphicalStyles = [];
        this.keywordIds = [];
        this.licenseModels = [];
        this.minimumSize = null;
        this.numberOfPeople = [];
        this.orientations = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.prestigeContentOnly = false;
        this.productTypes = [];
        this.sortOrder = null;       
    }
    
    execute(next) {
        var params = {};
        if (this.ageOfPeople.length > 0) {
            params.age_of_people = this.ageOfPeople.join(",");
        }
        if (this.artists.length > 0) {
            params.artists = this.artists.join(",");
        }
        if (this.collectionCodes.length > 0) {
            params.collection_codes = this.collectionCodes.join(",");
        }
        if (this.collectionsFilterType) {
            params.collections_filter_type = this.collectionsFilterType;
        }
        if (this.color) {
            params.color = this.color;
        }
         if (this.compositions.length > 0) {
            params.compositions = this.compositions.join(",");
        }
        if (this.embedContentOnly) {
            params.embed_content_only = this.embedContentOnly;
        }
        if (this.ethnicities.length > 0) {
            params.ethnicity = this.ethnicities.join(",");
        }
        if (this.excludeNudity) {
            params.exclude_nudity = this.excludeNudity;
        }
        if (this.fields.length > 0) {
            params.fields = this.fields.join(",");
        }
        if (this.fileTypes.length > 0) {
            params.file_types = this.fileTypes.join(",");
        }
        if (this.graphicalStyles.length > 0) {
            params.graphical_styles = this.graphicalStyles.join(",");
        }
        if (this.keywordIds.length > 0) {
            params.keyword_ids = this.keywordIds.join(",");
        }
        if (this.licenseModels.length > 0) {
            params.license_models = this.licenseModels.join(",");
        }
        if (this.minimumSize) {
            params.minimum_size = this.minimumSize;
        }
        if (this.numberOfPeople.length > 0) {
            params.number_of_people = this.numberOfPeople.join(",");
        }
        if (this.orientations.length > 0) {
            params.orientations = this.orientations.join(",");
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
        if (this.prestigeContentOnly) {
            params.prestige_content_only = this.prestigeContentOnly;
        }
        if (this.productTypes.length > 0) {
            params.product_types = this.productTypes.join(",");
        }
        if (this.sortOrder) {
            params.sort_order = this.sortOrder;
        }

        var path = "/v3/search/images/creative";
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
    withArtist(artist) {
        this.artists[this.artists.length] = artist;
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
    withColor(color) {
        this.color = color;
        return this;
    }
    withComposition(composition) {
        this.compositions[this.compositions.length] = composition;
        return this;
    }
    withEmbedContentOnly(embedContentOnly) {
        this.embedContentOnly = embedContentOnly;
        return this;
    }
    withEthnicity(ethnicity) {
        this.ethnicities[this.ethnicities.length] = ethnicity;
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
    withFileType(fileType) {
        this.fileTypes[this.fileTypes.length] = fileType;
        return this;
    }
    withGraphicalStyle(graphicalStyle) {
        this.graphicalStyles[this.graphicalStyles.length] = graphicalStyle;
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
    withMinimumSize(minimumSize) {
        this.minimumSize = minimumSize;
        return this;
    }
    withNumberOfPeople(numberOfPeople) {
        this.numberOfPeople[this.numberOfPeople.length] = numberOfPeople;
        return this;
    }
    withOrientation(orientation) {
        this.orientations[this.orientations.length] = orientation;
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
    withPrestigeContentOnly(prestigeContentOnly) {
        this.prestigeContentOnly = prestigeContentOnly;
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

module.exports = SearchImagesCreative;
