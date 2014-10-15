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
	test/connectsdk.js \
	
test-download:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/download.js \
	
test-getAccessToken:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/getaccesstoken.js \
	
test-images:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/images.js \
	
test-search:
	$(MOCHA) \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	test/search.js \
	
.PHONY: test-all test-download test-getAccessToken test-images test-search
