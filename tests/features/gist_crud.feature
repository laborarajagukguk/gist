Feature: End-to-End (e2e) tests for creating a gist.

Scenario: As a user, I want to create a public gist
  Given user log in to gist homepage
  When user create new public gist
  Then user will see new gist

Scenario: As a user, I want to see my list of gists.
  When user go to list gist
  Then user will see list of gist

Scenario: As a user, I want to edit an existing gist
  When user edit existing public gist
  Then user will see updated gist

Scenario: As a user, I want to delete an existing gist
  When user delete existing public gist
  Then system will show notification success deleted