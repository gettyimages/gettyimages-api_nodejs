MOCHA = ./node_modules/mocha/bin/mocha
REPORTER = spec

test-all: 
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/*.js \

test-connectSdk:
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/connectsdk.js \
	
test-download:
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/download.js \
	
test-getAccessToken:
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/getaccesstoken.js \
	
test-images:
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/images.js \
	
test-search:
	$(MOCHA) \
	--reporter $(REPORTER) \
	test/search.js \
	
.PHONY: test-all test-download test-getAccessToken test-images test-search