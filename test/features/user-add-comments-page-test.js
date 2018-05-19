const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User wants to add a comment', () => {
  describe('views the video listing', () => {
    it('comments section is blank', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('input[name="title"]', video.title);
      browser.setValue('textarea[name="description"]', video.description);
      browser.setValue('input[name="url"]', video.url);
      browser.click('#save-button');
      assert.include(browser.getText('body'), video.title);

      browser.url('/');
      browser.click('.video-card .video-title a');

      browser.click('#comment-button');

      assert.include(browser.getText('#author'), '');
      assert.include(browser.getText('#message'), '');
    });
  });
});
