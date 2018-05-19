const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User wants to update video', () => {
  describe('visits show video page', () => {
    it('clicks edit button and updates video', () => {
      const video = buildVideoObject();
      const newTitle = 'New Title';

      browser.url('/videos/create');
      browser.setValue('input[name="title"]', video.title);
      browser.setValue('textarea[name="description"]', video.description);
      browser.setValue('input[name="url"]', video.url);
      browser.click('#save-button');
      assert.include(browser.getText('body'), video.title);

      browser.click('#edit-button');
      browser.setValue('input[name="title"]', newTitle);

      browser.click('#update-button');

      assert.equal(browser.getText('#video-title'), newTitle);
    });
  });
})
