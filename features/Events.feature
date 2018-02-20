Feature: Event Details
  To create a rockin website with sweet images based on events i'm interested in
  As a developer that wants to get some image details
  I'd need to be able to get events so I can use them to refine my search queries

Scenario: Resource Owner Credentials
	Given I have an apikey
	And an apisecret
	And a username
	And a password
	And I have an event id I want details on
	When I retrieve event details
	Then I get a response back that has my event

Scenario: Client Credentials
	Given I have an apikey
	And an apisecret
	And I have an event id I want details on
	When I retrieve event details
	Then I get a response back that has my event

Scenario: Specify fields in Events Request
	Given I have an apikey
	And an apisecret
	And I have an event id I want details on
	And I specify field id
	And I specify field name
	And I specify field hero_image
	When I retrieve event details
	Then I get a response back that has my event
	And the response contains id
	And the response contains name
	And the response contains hero_image

Scenario: Specify multiple ids in batch image detail request
	Given I have an apikey
	And an apisecret
	And I have a list of event ids I want details on
	When I retrieve details for the events
	Then I get a response back that has details for multiple events
