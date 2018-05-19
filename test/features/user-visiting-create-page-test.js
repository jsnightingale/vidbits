const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visit create page', () => {
  describe('clicks on create page button', () => {
    it('links to the create page', () => {
      browser.url('/');
      browser.click('#create-button');

      assert.include(browser.getText('body'), 'Create Video');
    });
  });
  describe('displays video form', () => {
    it('all fields exist', () => {
      browser.url('/videos/create');

      assert.equal(browser.getText('input[name=title]'), '');
      assert.equal(browser.getText('textarea[name=description]'), '');
      assert.equal(browser.getText('input[name=url]'), '');
    });
  });
  describe('able to fill out form', () => {
    it('submits form and redirects to video page',() => {
      const video = buildVideoObject();

      browser.url('/videos/create');

      browser.setValue('input[name=title]', video.title);
      browser.setValue('textarea[name=description]', video.description);
      browser.setValue('input[name=url]', video.url);

      browser.click('#save-button');

      assert.include(browser.getText('#video-title'), video.title);
      assert.include(browser.getText('#video-description'), video.description);
      assert.include(browser.getAttribute('body iframe','src'), video.url);
    });
  });
});
