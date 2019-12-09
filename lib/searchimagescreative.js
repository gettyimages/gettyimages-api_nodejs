"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchImagesCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials, hostName);
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
        this.minimumSize = null;
        this.numberOfPeople = [];
        this.orientations = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.prestigeContentOnly = false;
        this.productTypes = [];
        this.sortOrder = null;
        this.headers = {};
    }

    execute(next) {
        var params = {};
        addParameter(params, "age_of_people", this.ageOfPeople);
        addParameter(params, "artists", this.artists);
        addParameter(params, "collection_codes", this.collectionCodes);
        addParameter(params, "collections_filter_type", this.collectionsFilterType);
        addParameter(params, "color", this.color);
        addParameter(params, "compositions", this.compositions);
        addParameter(params, "embed_content_only", this.embedContentOnly);
        addParameter(params, "ethnicity", this.ethnicities);
        addParameter(params, "exclude_nudity", this.excludeNudity);
        addParameter(params, "fields", this.fields);
        addParameter(params, "file_types", this.fileTypes);
        addParameter(params, "graphical_styles", this.graphicalStyles);
        addParameter(params, "keyword_ids", this.keywordIds);
        addParameter(params, "minimum_size", this.minimumSize);
        addParameter(params, "number_of_people", this.numberOfPeople);
        addParameter(params, "orientations", this.orientations);
        addParameter(params, "page", this.page);
        addParameter(params, "page_size", this.pageSize);
        addParameter(params, "phrase", this.phrase);
        addParameter(params, "prestige_content_only", this.prestigeContentOnly);
        addParameter(params, "product_types", this.productTypes);
        addParameter(params, "sort_order", this.sortOrder);

        var path = "/v3/search/images/creative";
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        return webHelper.get(path,this.headers);
    }

    withAcceptLanguage(language) {
        this.headers["Accept-Language"] = language;
        return this;
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

function addParameter(params, key, value) {
    if (value && value.length > 0) {
        if (value.constructor === Array) {
            params[key] = value.join(",");
        } else {
            params[key] = value;
        }
    }
}

module.exports = SearchImagesCreative;
