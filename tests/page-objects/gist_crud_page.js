const base = require('bizzy-nightwatch-base-page');
const { client } = require('nightwatch-cucumber');

const gist = {
  url() {
    const url = base.setURL(process.env.BASE_URL);
    return url;
  },
  testData: {
      pageTitle: 'Create a new Gist',
      messageDelete: 'Gist deleted successfully.'
  },
  elements: {
    txtEmail: '#login_field',
    txtPass: '#password',
    txtDesc: '.form-control.input-block.input-contrast',
    txtFilename: '.form-control.filename.js-gist-filename.js-blob-filename',
    txtContentArea: "div.CodeMirror-lines",
    txtContenteditArea: '.CodeMirror-line>span',
    txtGistFileLink: '.user-select-contain.gist-blob-name.css-truncate-target',

    gistDescription: '.repository-content.gist-content>div>div:nth-child(1)',
    goToMyGistList: '.author',
    gistList: '.d-inline-block',
    gistItem: '.js-gist-file-update-container.js-task-list-container.file-box',
    notification: '.flash.flash-full.flash-notice',

    btnToLogin: '.btn',
    btnLogin: '.btn.btn-primary.btn-block',
    btnCreate: '.form-actions>button:nth-child(1)',
    btnGistEdit: '.pagehead-actions>li:nth-child(1)',
    btnGistDelete: '.btn.btn-sm.btn-danger',
    btnUpdate: '.btn.btn-primary'
  },
  commands: [{
    navigateToPage() {
      this.navigate();
      base.maxWindow(this.api);
    },
    goToGistPage() {
        this.navigate(process.env.GIST_URL);
    },
    goToGistList() {
        base.clickElement(this, '@goToMyGistList');
    },
    login() {
        base.setValueElement(this, '@txtEmail', process.env.USER_LOGIN);
        base.setValueElement(this, '@txtPass', process.env.USERPASS);
        base.clickElement(this, '@btnLogin');
    },
    createGist() {
        base.setValueElement(this, '@txtDesc', 'description by me');
        base.setValueElement(this, '@txtFilename', 'filename by me');
        base.clickElement(this, '@txtContentArea');
        client.keys('a');
        base.clickElement(this, '@btnCreate');
    },
    verifyNewGist() {
        return base.expectVisible(this, '@txtGistFileLink');
    },
    verifyGistList() {
        return base.expectPresent(this, '@gistList');
    },
    editGist() {
        base.clickElement(this, '@gistItem');
        base.clickElement(this, '@btnGistEdit');
        base.setValueElement(this, '@txtFilename', 'updated filename by me');
        base.clickElement(this, '@btnUpdate');
    },
    verifyGistEdit() {
        return base.assertContainsText(this, '@txtGistFileLink', 'updated filename by me');
    },
    deleteGist() {
        base.clickElement(this, '@goToMyGistList');
        base.clickElement(this, '@gistItem');
        base.clickElement(this, '@btnGistDelete');
        client.acceptAlert()
    },
    verifyGistDeleted() {
        base.expectPresent(this, '@notification');
        return base.assertContainsText(this, '@notification', gist.testData.messageDelete);
    }
  }],
};
module.exports = gist;
