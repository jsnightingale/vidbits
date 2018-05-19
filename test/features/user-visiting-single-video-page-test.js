const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User wants to visits single video', () => {
  describe('clicks on video title', () => {
    it('and can navigate to a video', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('input[name="title"]', video.title);
      browser.setValue('textarea[name="description"]', video.description);
      browser.setValue('input[name="url"]', video.url);
      browser.click('#save-button');
      assert.include(browser.getText('body'), video.title);

      browser.url('/');
      browser.click('.video-card .video-title a');

      assert.include(browser.getText('body'), video.description);
    });
  });
});
