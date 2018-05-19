const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visiting home page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('with existing video', () => {
    it('and iframe is present on the page', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('#video-title', video.title);
      browser.setValue('#video-description', video.description);
      browser.setValue('#video-url', video.url)
      browser.click('#save-button');

      browser.url('/');

      assert.include(browser.getAttribute('body iframe', 'src'), video.url);
    });
  });
});
