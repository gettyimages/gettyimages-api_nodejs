"use strict";

var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchImages extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.assetFamily = null;
        this.editorialSegments = [];
        this.embedContentOnly = false;
        this.excludeNudity = false;
        this.fields = [];
        this.graphicalStyles = [];
        this.licenseModels = [];
        this.orientations = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.sortOrder = null;
        this.ageOfPeople = [];
        this.artists = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.compositions = [];
        this.dateFrom = null;
        this.dateTo = null;
        this.eventIds = [];
        this.ethnicities = [];
        this.fileTypes = [];
        this.keywordIds = [];
        this.numberOfPeople = [];
        this.productTypes = [];
        this.specificPeople = [];
        this.prestigeContentOnly = null;
    }
    
    editorial() {
        this.assetFamily = "editorial";
        return this;
    }
    
    creative() {
        this.assetFamily = "creative";
        return this;
    }
    
    execute(next) {
        var params = {};
        if (this.editorialSegments.length > 0) {
            params.editorial_segments = this.editorialSegments.join(",");
        }
        if (this.embedContentOnly) {
            params.embed_content_only = this.embedContentOnly;
        }
        if (this.excludeNudity) {
            params.exclude_nudity = this.excludeNudity;
        }
        if (this.fields.length > 0) {
            params.fields = this.fields.join(",");
        }
        if (this.graphicalStyles.length > 0) {
            params.graphical_styles = this.graphicalStyles.join(",");
        }
        if (this.licenseModels.length > 0) {
            params.license_models = this.licenseModels.join(",");
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
        if (this.sortOrder) {
            params.sort_order = this.sortOrder;
        }
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
        if (this.compositions.length > 0) {
            params.compositions = this.compositions.join(",");
        }
        if (this.dateFrom) {
            params.date_from = this.dateFrom;
        }
        if (this.dateTo) {
            params.date_to = this.dateTo;
        }
        if (this.eventIds.length > 0) {
            params.event_ids = this.eventIds.join(",");
        }
        if (this.ethnicities.length > 0) {
            params.ethnicity = this.ethnicities.join(",");
        }
        if (this.fileTypes.length > 0) {
            params.file_types = this.fileTypes.join(",");
        }
        if (this.keywordIds.length > 0) {
            params.keyword_ids = this.keywordIds.join(",");
        }
        if (this.numberOfPeople.length > 0) {
            params.number_of_people = this.numberOfPeople.join(",");
        }
        if (this.specificPeople.length > 0) {
            params.specific_people = this.specificPeople.join(",");
        }
        if (this.productTypes.length > 0) {
            params.product_types = this.productTypes.join(",");
        }
        if (this.prestigeContentOnly) {
            params.prestige_content_only = this.prestigeContentOnly;
        }
        var path = "/v3/search/images";
        if (this.assetFamily) {
            path += "/";
            path += this.assetFamily;
        }
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
      
    withEditorialSegment(editorialSegment) {
        if (this.assetFamily !== "editorial") {
            throw new SdkException("search images must be editorial to add an editorial segment");
        }
        this.editorialSegments[this.editorialSegments.length] = editorialSegment;
        return this;
    }
    
    withLicenseModel(licenseModel) {
        if (this.assetFamily === "editorial") {
            throw new SdkException("search images must not be editorial to add a license model");
        }
        this.licenseModels[this.licenseModels.length] = licenseModel;
        return this;
    }
    withEmbedContentOnly(embedContentOnly) {
        this.embedContentOnly = embedContentOnly;
        return this;
    }
    withExcludeNudity(excludeNudity) {
        this.excludeNudity = excludeNudity;
        return this;
    }
    withGraphicalStyle(graphicalStyle) {
        this.graphicalStyles[this.graphicalStyles.length] = graphicalStyle;
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
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }
    withSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
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
    withComposition(composition) {
        this.compositions[this.compositions.length] = composition;
        return this;
    }
    withDateFrom(dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }
    withDateTo(dateTo) {
        this.dateTo = dateTo;
        return this;
    }
    withEventId(eventId) {
        if (this.assetFamily === "creative") {
            throw new SdkException("search images must be editorial or blended to add an event id");
        }
        this.eventIds[this.eventIds.length] = eventId;
        return this;
    }
    withEthnicity(ethnicity) {
        this.ethnicities[this.ethnicities.length] = ethnicity;
        return this;
    }
    withFileType(fileType) {
        this.fileTypes[this.fileTypes.length] = fileType;
        return this;
    }
    withKeywordId(keywordId) {
        this.keywordIds[this.keywordIds.length] = keywordId;
        return this;
    }
    withNumberOfPeople(numberOfPeople) {
        this.numberOfPeople[this.numberOfPeople.length] = numberOfPeople;
        return this;
    }
    withProductType(productType) {
        this.productTypes[this.productTypes.length] = productType;
        return this;
    }
    withSpecificPerson(specificPerson) {
        if (this.assetFamily === "creative") {
            throw new SdkException("search images must be editorial or blended to add a specific person");
        }
        this.specificPeople[this.specificPeople.length] = specificPerson;
        return this;
    }
    withPrestigeContentOnly(prestigeContentOnly) {
        this.prestigeContentOnly = prestigeContentOnly;
        return this;
    }
}

module.exports = SearchImages;
