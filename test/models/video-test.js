const {assert} = require('chai');
const Video = require('../../models/video');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Model: Video', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});

      assert.strictEqual(video.title, titleAsNonString.toString());
    });
    });
  describe('#description', () => {
    it('is a String', () => {
      const descriptionAsNonString = 1;
      const video = new Video({description: descriptionAsNonString});

      assert.strictEqual(video.description, descriptionAsNonString.toString());
    });
  });
  describe('#url', () => {
    it('is a String', () => {
      const urlAsNonString = 1;
      const video = new Video({url: urlAsNonString});

      assert.strictEqual(video.url, urlAsNonString.toString());
    });
  });
});
