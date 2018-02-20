Feature: Video Metadata
	As a consumer of the SDK
	I want to get video metadata
	So I can use the metadata in my application

Scenario: SDK client can get default metadata about a video
	Given I have an apikey
	And an api secret
	And a video id
	When the video metadata request is executed
	Then the status is success
	And the video metadata is returned

Scenario: SDK client can specify a field when requesting video metadata
	Given I have an apikey
	And an api secret
	And a username
	And a password
	And a video id
	And caption field is specified
	When the video metadata request is executed
	Then the status is success
	And the video metadata is returned
	And the caption field is returned

Scenario: SDK client can get default metadata about multiple videos
	Given I have an apikey
	And an api secret
	And a list of video ids
	When the video metadata request is executed
	Then the status is success
	And a list of video metadata is returned

Scenario: SDK client throws an exception when a video is not found
	Given I have an apikey
	And an api secret
	And a username
	And a password
	And a non-existent video id
	When the video metadata request is executed
	Then an error is returned
	And the error explains that the video was not found

