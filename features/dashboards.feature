#This is my first commit

Feature: Navigate dashboards

Scenario: Open national dashboard
Given that I am a regular user
When I go to the homepage
Then I see map of Uganda

Scenario: Open district dashboard
Given that I am a regular user
When I open dashboard for Gulu
Then I see map of Uganda - Gulu
Then "Gulu" will be selected

Scenario: Highlight a District
Given that I am a regular user
When I go to the homepage
And I hover over "Lira"
Then "Lira" will be highlighted

Scenario: Navigate to District
Given that I am a regular user
When I go to the homepage
And I click on "Gulu"
Then "Gulu" will be selected

Scenario: Open subcountry dashboard
Given that I am a regular user
When I open dashboard for Gulu Patiko
Then I see map of Uganda - Gulu - Patiko
Then "Gulu, Patiko" will be selected

Scenario: Navigate to Subcounty
Given that I am a regular user
When I go to the homepage
And I click on "Gulu"
Then "Gulu" will be selected
And I hover over "Gulu, Patiko"
Then "Gulu, Patiko" will be highlighted
And I click on "Gulu, Patiko"
Then "Gulu, Patiko" will be selected

Scenario: Navigate by breadcrumb
Given that I am a regular user
When I open dashboard for Gulu Patiko
And I click on the district breadcrumb link
Then I see map of Uganda - Gulu
And I click on the national breadcrumb link
Then I see map of Uganda

Scenario: Navigate to Parish
Given that I am a regular user
When I open dashboard for Gulu Patiko
And I hover over "Gulu, Patiko, Pawel"
Then "Gulu, Patiko, Pawel" will be highlighted
And I click on "Gulu, Patiko, Pawel" 
Then "Gulu, Patiko, Pawel" will be selected

Scenario: Navigate to Incorrect URL
Given that I am a regular user
When I go to the home page
And I navigate to "../district/hulu" 
Then a page with an error message is displayed 
And the page has a link to the homepage
