MOCHA = ./node_modules/mocha/bin/mocha
REPORTER = spec
TIMEOUT = 5000

test-all: 
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/*.js \

test-connectSdk:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/TestConnectSdk.js \
	
test-download:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/TestDownload.js \
	
test-getAccessToken:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/TestGetAccessToken.js \
	
test-images:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/TestImages.js \
	
test-search:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/TestSearch.js \
	
.PHONY: test-all test-download test-getAccessToken test-images test-search