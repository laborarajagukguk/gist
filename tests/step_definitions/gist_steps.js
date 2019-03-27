const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

const browser = client.page.gist_crud_page();

Given(/^user log in to gist homepage/, () => {
    browser.navigateToPage();
    browser.login();
    browser.goToGistPage();
});

When(/^user create new public gist$/, () => browser.createGist());

When(/^user go to list gist$/, () => browser.goToGistList());

When(/^user edit existing public gist$/, () => browser.editGist());

When(/^user delete existing public gist$/, () => browser.deleteGist());

Then(/^user will see new gist$/, () => browser.verifyNewGist());

Then(/^user will see list of gist$/, () => browser.verifyGistList());

Then(/^user will see updated gist$/, () => browser.verifyGistEdit());

Then(/^system will show notification success deleted$/, () => browser.verifyGistDeleted());
