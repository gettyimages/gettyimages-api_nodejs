Feature: Search Results Paging
  To be able to use more than just the first set of results from search
  As a developer that wants to page through the result set
  I'd need to be able to specify page number and number of items

Scenario Outline: Creative Image Searching
  Given I have an apikey
  And an apisecret
  And I configure my search for creative images
  And I specify phrase <Phrase>
  And I specify <ItemCount> number of items per page
  And I want page <PageNum>
  When I retrieve the results
  Then the number of items returned matches <ItemCount>
Examples:
    | PageNum | ItemCount | Phrase |
    | 1       | 5         | dog    |
    | 2       | 10        | dog    |
    | 5       | 15        | dog    |

Scenario: Reuse request for multiple pages
Given I have an apikey
And an apisecret
And I configure my search for creative images
And I specify phrase dog
When I retrieve page 1
And I retrieve page 2
Then the response has images