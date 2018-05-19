const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User wants to delete video', () => {
  describe('visits show video page', () => {
    it('clicks delete button and removes video', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('input[name="title"]', video.title);
      browser.setValue('textarea[name="description"]', video.description);
      browser.setValue('input[name="url"]', video.url);
      browser.click('#save-button');
      assert.include(browser.getText('body'), video.title);

      browser.click('#delete-button');

      browser.url('/');

      assert.notEqual(browser.getText('body'), video.title);
    });
  });
})
